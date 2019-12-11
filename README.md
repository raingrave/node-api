# Node API

Node api example

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

Customers

GET /customers list all customers
  RESPONSE
    [
      {
        "name": "My Name",
        "email": "email@email.com",
        "password": "secret",
      },
      {
        "name": "My Name",
        "email": "email@email.com",
        "password": "secret",
      }
    ]
    
GET /customer/id list specific customer
  
RESPONSE
  {
    "name": "My Name",
    "email": "email@email.com",
    "password": "secret",
  }  
  
POST /customers create new customer

REQUEST
  {
    "name": "My Name",
    "email": "email@email.com",
    "password": "secret",
  }
RESPONSE
  {
    "id": 1,
    "name": "My Name",
    "email": "email@email.com",
    "password": "hash",
  }

PUT /customers/id

REQUEST
{
  "name": "new name"
}

RESPONSE
true

DELETE /customers/id

RESPONSE
true