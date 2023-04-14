DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE Departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30)
);

CREATE TABLE Roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT NOT NULL REFERENCES department(id)
);

CREATE TABLE Employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL REFERENCES role(id),
  manager_id INT  NULL REFERENCES employee(id) ON DELETE SET NULL
);