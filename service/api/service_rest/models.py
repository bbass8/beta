from django.db import models


class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "statuses"


class Technician(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    employee_id = models.BigIntegerField(max_length=20, null=True)

    def __str__(self):
        return self.first_name


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, null=True)

    def __str__(self):
        return self.vin


class Appointment(models.Model):

    date_time = models.DateTimeField()
    reason = models.CharField(max_length=150)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    vip = models.BooleanField(default=False)

    status = models.CharField(max_length=10, default="PENDING")
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"Appointment: {self.customer} - {self.date_time}"

    def finish(self):
        thestatus = "FINISHED"
        self.status = thestatus
        self.save()

    def cancel(self):
        thestatus = "CANCELED"
        self.status = thestatus
        self.save()
