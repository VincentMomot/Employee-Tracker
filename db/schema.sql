Drop DATABASE if exists tesla_db;
CREATE DATABASE tesla_db;
USE tesla_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL NOT NULL,
department_id INT NOT NULL --Holds the department reference
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL--holds role reference
FOREIGN KEY (role_id)
REFERENCES role(id),
manager_id INT --holds reference to manager's name if applicable
FOREIGN KEY (employee_id)
REFERENCES employee(id)
);

-- department
-- id: INT PRIMARY KEY
-- name: VARCHAR(30) to hold department name

-- role
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) to hold role title
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role belongs to

-- employee
-- id: INT PRIMARY KEY
-- first_name: VARCHAR(30) to hold employee first name
-- last_name: VARCHAR(30) to hold employee last name
-- role_id: INT to hold reference to employee role
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)