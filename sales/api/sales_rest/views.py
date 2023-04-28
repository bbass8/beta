from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Salesperson, Sale, Customer, AutomobileVO
import json
from .encoders import SaleEncoder, CustomerEncoder, SalespersonEncoder


@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalespersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salespersons = Salesperson.objects.create(**content)
            return JsonResponse(
                salespersons,
                encoder=SalespersonEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Salesperson was unable to be created"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"}
                )
    else:
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Customer was unable to be created"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"}
                )

    else:
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(
                vin=content["vin"])
            if automobile.sold is False:
                automobile.sold = True
                automobile.save()
                content["automobile"] = automobile

                customer = Customer.objects.get(
                    first_name=content["customer"])

                content["customer"] = customer

                salesperson = Salesperson.objects.get(
                    first_name=content["salesperson"])
                content["salesperson"] = salesperson
                sale = Sale.objects.create(**content)
                return JsonResponse(
                    sale,
                    encoder=SaleEncoder,
                    safe=False
                )
            else:
                response = JsonResponse(
                    {"error": "Automobile already sold"},
                )
                response.status_code = 400
                return response

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"Error": "Automobile could not be found"},
                status=400
            )


@require_http_methods(["GET"])
def api_show_sale(request, pk):
    try:
        sale = Sale.objects.filter(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )
    except Sale.DoesNotExist:
        return JsonResponse(
            {"Error": "Sale could not be found"},
            status=400
            )
