from service_rest.models import AutomobileVO
import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()


def pollAuto():
    response = requests.get(
        "http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)
    for car in content["autos"]:
        try:
            AutomobileVO.objects.update_or_create(
                vin=car["vin"]
            )
        except Exception as e:
            print("Error:", e)


def poll():
    while True:
        print('Service poller polling for data')
        try:
            pollAuto()
        except Exception as e:
            print("Outside error:", e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
