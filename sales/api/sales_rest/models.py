from django.db import models
from django.urls import reverse


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.BigIntegerField(null=True)

    def __str__(self):
        return f"{self.first_name}"


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=False, null=True)
    vin = models.CharField(max_length=30, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"


class Sale(models.Model):
    vin = models.CharField(max_length=30, null=True)
    price = models.PositiveBigIntegerField(null=True)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.automobile} - {self.customer} - {self.salesperson}"
