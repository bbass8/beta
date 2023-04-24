from django.db import models

class Technician(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    employee_id = models.BigIntegerField

class AutomobileVO(models.Model):
    vin = models.BigIntegerField

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=150)
    status = models.CharField(max_length=150)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)

    Technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
        null=True
    )
