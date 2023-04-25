import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something

from service_rest.models import AutomobileVO

def pollAuto():

    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)


    for car in content["autos"]:
        print(car)
        try:
            obj, created = AutomobileVO.objects.update_or_create(
                vin=car["vin"]
            )
            if created:
                print("We created a new AutomobileVO object:", obj)

            else:
                print("Updated this object:", obj)

        except Exception as e:
            print("Rough, got an error:", e)


def poll():
    while True:
        print('Service poller polling for data')
        try:
            pollAuto()
        except Exception as e:
            print("Outside error:", e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
