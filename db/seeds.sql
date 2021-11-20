INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Assembly"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Electrical Engineer",80000,1),
       ("Mechanical Engineer",80000,1),
       ("Finance",200000,2),
       ("Accountant",150000,2),
       ("Factory Worker",260000,3),
       ("Industrial Designer",265000,3),
       ("Manager",95000,4);

INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Elon","Musk",7),
       ("Jeffrey","Epstein",7);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Danny","DeVido",1,4),
       ("Betty","Crocker",2,1),
       ("Grant","Cardone",3,4),
       ("Mia","Khalifa",4,2),
       ("Joseph","Biden",5,2),
       ("Hunter","Biden",6,2);



