# Generated by Django 4.0.3 on 2023-04-24 23:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_remove_appointment_technician_appointment_technician'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='technician',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='technician', to='service_rest.technician'),
        ),
    ]