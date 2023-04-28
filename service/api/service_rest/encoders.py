from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder


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
