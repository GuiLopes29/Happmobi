# About application

This application has the objective to book vehicle to an user, and the user can only has one vehicle booked and the vehicle can only be booked for one user at same time.

## Local instalation
- To run in your computer, clone the repository by the terminal
https://github.com/GuiLopes29/Happmobi.git

- Go to the folder on you cloned the repository and install the dependencies:

#### NPM
```
npm i
```

or

```
npm install
```

#### Yarn
```
npm i yarn
```
or
```
npm install yarn
```

- To run the app run this command:
*(Check if you have configured your **.env** configs)*
```
nest start
```

Attention: the port used in application is 3000, they'll run in: http://localhost:3000/

## Utilization rotes

#### Login
- First of all, we reccomend you to login (If you didn't has one, you need to create a new in DB or ask to your responsable)

*Pay attention, if you're creating a new user in db, please encrypt the password with bcrypto to get the security on application, if you want, can use this site: https://www.browserling.com/tools/bcrypt please use **12 rouds** or costumize in app before*

Do one **POST** request with the route: "/user", with body:
```
{
  "login": "username",
  "password": "password"
}
```

+ You'll get this if the credentials is ok:
![image](https://user-images.githubusercontent.com/33187657/181409491-50dbd0cf-6129-48ba-ae25-05721f777d4e.png)

+ If the credentials is invalid:      
![image](https://user-images.githubusercontent.com/33187657/181409669-6f4aae06-c575-4636-8bae-c07713fb6215.png)

+ And after you get the token, it's needed to put in header like this:
![image](https://user-images.githubusercontent.com/33187657/181409813-c78fbd58-850a-446e-8f06-62978c8fcf3f.png)

#### Vehicles
- For this routes you'll use the route: "/vehicle"

- To list all available cars do **GET** and you'll receive this:
![image](https://user-images.githubusercontent.com/33187657/181410670-a5196e34-3fc6-40c4-9121-153c61e0bb50.png)

- To book a vehicle you want do **PUT**;
- If you want to book an available vehicle you'll need to use the body:
*Use the id of user you want to book the vehicle*
```
{
	"licensePlate": "A1B2C4",
	"reserved": true,
	"id": 1
}
```
![image](https://user-images.githubusercontent.com/33187657/181411320-60783093-c0be-4360-9564-c37481e44d57.png)

- If want to unbook use this:

```
{
	"licensePlate": "A1B2C4",
	"reserved": false,
	"id": 1
}
```
![image](https://user-images.githubusercontent.com/33187657/181411468-61fed0bf-9307-4be3-9eab-c9f0d22e5751.png)

- If is an invalid vehicle:            
![image](https://user-images.githubusercontent.com/33187657/181411980-95a69cb1-ef6d-412e-bbcd-c3a745cb1a6f.png)

- If is an invalid user id:         
![image](https://user-images.githubusercontent.com/33187657/181412135-2134cb19-e9a8-457e-bdc4-dbca2b68c00d.png)


## Swagger
- To see Swagger UI go to ```http://localhost:3000/api/```
![image](https://user-images.githubusercontent.com/33187657/181412438-6512a8c9-3d2e-4ced-b99c-cc20ddb36222.png)
