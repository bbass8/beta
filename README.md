# CarCar

Team:

- Benjamin Bass - Sales

* Bradley Allen - Automobile Service

## Design

## Service microservice

The models that I created represent all the valuable data necessary for eventually making a sale on CarCar. This includes a salesperson, a customer, an automobile and a sale. The automobile value object is the class I created that is used in my poller file to communicate with the inventory microservice, which grabs the automobile data and gives my sales microservice access to it. This is done using the vin of the automobile.

## Sales microservice

I have created a Technician, Appointment and AutomobileVO to accurately retrieve data from the inventory, as well as keep track of any technicians or appointments that are needed.  The AutomobileVO is polled from the inventory to keep an updated account of all vehicle VINs that are added to the inventory. This VO is then used to help facilitate the needs of CarCar.
