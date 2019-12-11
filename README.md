# Node api example

## Installation

Install project

create database and rename/configuration .env.example file

1. cd project path
2. npm install
3. npx sequelize-cli db:migrate
4. npm run dev
4. http://localhost:9090

## License
[MIT](https://choosealicense.com/licenses/mit/)

Resources

Auth

POST /authenticate 
```javascript
{ email: VALID_EMAIL, password: VALID_PASSWORD }
```
POST /logout

Customers

GET /customers list all customers
GET /customer/id list specific customer
POST /customers create new customer
```javascript{ email: VALID_NAME, email: VALID_EMAIL, password: VALID_PASSWORD }
```
PUT /customers/id
```javascript
{ email: OTHER_NAME, email: OTHER_EMAIL, password: OTHER_PASSWORD }
```
DELETE /customers/id

Movies

GET /movies list all movie
GET /movies/id list specific movie
POST /movies create new movie
```javascript
{ title: TITLE, director: DIRECTOR }
```
PUT /movies/id
```javascript
{ title: TITLE, director: DIRECTOR }
```
DELETE /movies/id

Rents

GET /rents/customerId list movies rented by customer
POST /rents rent especific movie
```javascript
{ customer_id: VALID_CUSTOMER, movie_id: VALID_MOVIE }
```
PUT /rents return specific movie
```javascript
{ customerId: VALID_CUSTOMER, movieId: VALID_MOVIE }
```
