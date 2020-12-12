Seytech Customers CRUD application.

## Data

    * id, name, lastName, avatar, email, state, phone, role, github username, courses, payments, status, repl progress, actions

## Features

    * Search, silter, sort
    * User Role(student, mentor, instructor, admin)
    * Add Student
    * Delete Student
    * Update Student

## Tech stack

    * React
    * MongoDB
    * Heroku
    * Node.js / Express
    * Mongoose
    * React-router
    * Reactstrap

## Teams

    * Back End:
        * Tamerlan
        * Aidana
        * Mahabat
        * Tolgonai

    * Front End: Rest.

## Day 1 - 10/28/2020

    * Practice
        * React Basics
            * Life-cycle methods
            * Setstate
            * Component vs Class
            * Creating Data

    * Reactstrap(Bootstrap)
    * CRUD Apps
    * Project start/management

    * Homework
        * Learn React Router
        * Clone from github

## Day 3 - 11/23/2020

    * Hook Up FE and BE
    * Read about cookies, token. How they communicate between client and server
    Tasks:
     * (GET) Get single customer: https://seytech-customers-backend.herokuapp.com/api/v1/customer/:id
     Provide id in params
     * (GET) Get rid of customers data and use: https://seytech-customers-backend.herokuapp.com/api/v1/customers endpoint
     * (DELETE) Delete a customer: https://seytech-customers-backend.herokuapp.com/api/v1/customer/:id
    * (POST) Create a customer: https://seytech-customers-backend.herokuapp.com/api/v1/create
    Provide details in the body
    * (PATCH) Update a customer: https://seytech-customers-backend.herokuapp.com/api/v1/customer/:id
    Provide data in body and id in params

#### Order of branches:

    1. master
    2. login-token-cookie
    3. crud-validation-fetch
    4. search-sort
    5. pagination
    6. context-api : themes, css styling
    7. hooks
    8. testing
