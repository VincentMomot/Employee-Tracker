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
        db.query('SELECT * FROM role', function (err, results) {
          console.log("\n");
          console.table(results);
        })
        tesla()
      }
      else if (answers.operation == "View all employees") {
        db.query('SELECT * FROM employee', function (err, results) {
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
            console.table(results);
          })
        })
        tesla()
      }
      else if (answers.operation == "Add a role") {
        role()
        tesla()
      }
      else if (answers.operation == "Add an employee") {
        newEmployee()
        tesla()
      }
      else if (answers.operation == "Update an employee role") {
        updateEmployee()
        tesla()
      }
      else {
        console.error(err)
      }


    })
};

//------------calls the initial function
tesla();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




function role() {
  inquirer.prompt([{
    type: "input",
    message: "What is the department name?",
    name: "title"
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "salary"
  },
  {
    //this should take from the db and be a rawlist
    type: "input",
    message: "What department is this role under?",
    name: "department"
  },

  ]).then(function (answers) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}",${answers.salary},${answers.department})`, function (err, results) {
      console.log("\n");
      console.table(results);
    })
  })
}


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


function updateEmployee() {
  inquirer.prompt([
    {
      //this should take from the db and be a rawlist
      type: "input",
      message: "Which employee's role do you want to change?",
      name: "name"
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
};

// db.query(`SELECT name from department`, function (err, results) {
// console.table(results)
// let options=[];
// for(let i=0; i<results.length; i++){
//   options.push(`${JSON.stringify(results[i])}`)

// };
// console.table(options)

// inquirer.prompt([
//   {
//     type: "list",
//     message: "Choose your operation",
//     name: "operation",
//     choices: [options[0]]
//   }
// ])

// });
