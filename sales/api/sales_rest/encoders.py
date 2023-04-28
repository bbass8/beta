from common.json import ModelEncoder
from .models import Salesperson, Sale, Customer, AutomobileVO


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "salesperson",
        "automobile",
        "customer",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
    }
