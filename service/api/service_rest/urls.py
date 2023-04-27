
from django.contrib import admin
from django.urls import path
from .views import (api_technicians,
                    api_technician_detail,
                    api_appointments,
                    api_appointment_detail,
                    api_finish_appointment,
                    api_cancel_appointment,
                    api_search_vin,
                    )

urlpatterns = [
    path(
        "technicians/",
        api_technicians,
        name="api_technicians",
    ),
        path(
        "technicians/<int:pk>/",
        api_technician_detail,
        name="show_tech_detail",
    ),

        path(
        "appointments/",
        api_appointments,
        name="api_appointments",
    ),

        path(
        "appointments/<int:pk>/",
        api_appointment_detail,
        name="show_appointment_detail",
    ),
        path(
        "appointments/vin/<str:pk>/",
        api_search_vin,
        name="api_search_vin",
    ),

        path(
        "appointments/<int:pk>/finish/",
        api_finish_appointment,
        name="api_finish_appointment",
    ),
            path(
        "appointments/<int:pk>/cancel/",
        api_cancel_appointment,
        name="api_cancel_appointment",
    ),

]
