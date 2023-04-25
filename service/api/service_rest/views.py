from django.http import JsonResponse
from .models import Technician, AutomobileVO, Appointment
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json

def failure():
    return JsonResponse({"message": "failure!"}, status=400)

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name",
                  "last_name",
                  "employee_id"
                  ]
    encoders = {
        "automobileVO": AutomobileVODetailEncoder(),
    }

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["date_time",
                  "reason",
                  "vin",
                  "customer",
                  "vip",
                  "technician",
                  "id"
                  ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }
    def get_extra_data(self, o):
        return {"status": o.status}


@require_http_methods(["GET","POST"])
def api_technicians(request):
    """
    Will list out all the Technicians as a JsonResponse object.
    """
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians":technicians},
                encoder=TechnicianListEncoder,
                )
        except:
            failure()
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianListEncoder,
                safe=False
            )
        except:
            failure()

@require_http_methods(["GET","DELETE"])
def api_technician_detail(request,pk):
    """
    Shows the detail of a tech!
    """
    if request.method == "GET":
        try:
            tech = Technician.objects.get(id=pk)
            return JsonResponse(
                tech,
                encoder = TechnicianListEncoder,
                safe=False
            )
        except:
            failure()
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=pk).delete()
            if count > 0:
                return JsonResponse({"deleted": count > 0}, status=200)
            else:
                return JsonResponse({"message": "Failure"}, status=400)
        except:
            failure()


@require_http_methods(["GET","POST"])
def api_appointments(request):
    """
    Will list out all the Technicians as a JsonResponse object.
    """
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments":appointments},
                encoder=AppointmentListEncoder,
                )
        except:
            failure()
    else:
        content = json.loads(request.body)

        try:
            technician_id = content['technician']
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician

        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid technician id"}, status=400)

        if AutomobileVO.objects.filter(vin=content["vin"]):
            content["vip"] = True

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )

@require_http_methods(["GET","DELETE"])
def api_appointment_detail(request,pk):
    """
    Shows the detail of an Appt!
    """

    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                {"appointment":appointment},
                encoder = AppointmentListEncoder,
                safe=False
            )
        except:
            failure()
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=pk).delete()
            if count > 0:
                return JsonResponse({"deleted": count > 0})
            else:
                return JsonResponse({"message": "Failure"}, status=400)
        except:
            return JsonResponse({"message": "failure!"}, status=400)
@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.finish()
        return JsonResponse({"status":appointment.status, "message": "success!"},status=200)
    except:
        failure()


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.cancel()
        return JsonResponse({"status":appointment.status, "message": "success!"},status=200)
    except:
        failure()

def api_search_vin(request, pk):
    try:
        matching = Appointment.objects.filter(vin=pk)
        return JsonResponse(
            matching,
            encoder=AppointmentListEncoder,
            safe=False
        )

    except:
        failure()
