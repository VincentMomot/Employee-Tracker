const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const table = require('console.table');
//console.table

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Password#1',
    database: 'tesla_db'
  },
  console.log(`Connected to the Tesla database.\n`)
);

function tesla() {
  inquirer.prompt([
    {
      type: "list",
      message: "Choose your operation",
      name: "operation",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit program"
      ]
    }
  ])
    .then(function (answers) {
      if (answers.operation == "Quit program") {
        console.table("Program has ended")
        process.exit()
      }
      else if (answers.operation == "View all departments") {
        db.query('SELECT * FROM department', function (err, results) {
          console.log("\n");
          console.table(results);
        });
        tesla()
      }
      else if (answers.operation == "View all roles") {
        db.query(`SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role 
        JOIN department 
        ON role.department_id = department.id;`, function (err, results) {
          console.log("\n");
          console.table(results);
        })
        tesla()
      }
      else if (answers.operation == "View all employees") {
        db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, role.department_id AS department
        FROM employee
        JOIN role
        ON employee.role_id = role.id
        ;`
        , function (err, results) {
          console.log("\n");
          console.table(results);
        })
        tesla()
      }
      else if (answers.operation == "Add a department") {
        inquirer.prompt([{
          type: "input",
          message: "What is the department name?",
          name: "departmentName"
        }]).then(function (answers) {
          db.query(`INSERT INTO department (name) VALUES ("${answers.departmentName}")`, function (err, results) {
            console.log("\n");
            // console.table(results);
          })
          tesla()
        })
       
      }
      else if (answers.operation == "Add a role") {
        addRole()
        //need tesla call
      }
      else if (answers.operation == "Add an employee") {
        newEmployee()
        //need tesla call

      }
      else if (answers.operation == "Update an employee role") {
        updateEmployee()
        //need tesla call
      }
      else {
        console.error(err)
      }


    })
};

//------------calls the initial function still need addRole, newEmployee and updateEmployee 
tesla();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


function newEmployee() {
  inquirer.prompt([{
    type: "input",
    message: "What is the employee's first name?",
    name: "fName"
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "lName"
  },
  {
    //this should take from the db and be a rawlist
    type: "input",
    message: "What is the employee's role?",
    name: "role"
  },
  {
    //this should take from the db and be a rawlist
    type: "input",
    message: "Who is the employee's manager?",
    name: "manager"
  }

  ]).then(function (answers) {
    db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${answers.fName}",${answers.lName},${answers.role},${answers.manager})`, function (err, results) {
      console.log("\n");
      console.table(results);
    })
  })
};

const employeeSelect=[];

function updateEmployee() {
  db.query(`SELECT employee.first_name, employee.last_name FROM employee`, function (err, results) {
    // console.table(results)
    let employees = results
    employees.map(employee => {
      employeeSelect.push(employee)
      
    });
  
  inquirer.prompt([
    {
      //this should take from the db and be a rawlist
      type: "list",
      message: "Which employee's role do you want to change?",
      name: "name",
      choices: employeeSelect
    },
    {
      //this should take from the db and be a rawlist
      type: "input",
      message: "What do you want to change the employee's role to?",
      name: "role"
    }
  ])
    //display first and last name, but use ID for reference to change the employee's role
    .then(function (answers) {
      db.query(`UPDATE employee set employee WHERE id = ("${answers}")`, function (err, results) {
        console.log("\n");
        console.log(results);
      })
    })
})};

const departmentSelect=[];

function addRole() {
  db.query(`SELECT name from department`, function (err, results) {
    //console.table(results)
    let departments = results
    departments.map(department => {
      departmentSelect.push(department)
      
    });
    
  //console.log(departmentSelect) 
  inquirer.prompt([
    {
      type: "list",
      message: "In what department does this role reside?",
      name: "department",
      choices: departmentSelect
    },
    {
      type: "text",
      message: "What is the name of the new role?",
      name: "role"
    },
    {
      type: "text",
      message: "What is the salary of the new role?",
      name: "salary"
    }
  ])
  .then(function (answers) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.role}",${answers.salary},1)`, function (err, results) {
      console.log("\n");
      // console.table(results);
    })
    tesla();
  })
});

}

