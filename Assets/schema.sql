DROP DATABASE IF EXISTS EMPLOYEE_DB;

CREATE DATABASE EMPLOYEE_DB;

USE EMPLOYEE_DB;

CREATE TABLE department (
    id int primary key,
    department_name varchar(30)
)

CREATE TABLE role (
    id int primary key,
    title varchar(30),
    salary decimal,
    department_id int
)

CREATE TABLE employee (
    id int primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
)
