var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ditc9898#",
  database: "EMPLOYEE_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected")
  start()
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            message:  "What would you like to do?",


            choices: ["Add Department, Add Roles, Add Employees", "View departments, roles, employees", "Update employee role"],

            name: "action"

        },
        {   
            type: "list",
            message: "Would you like to add departments, roles, or employees?", 
            name: "add",
            choices: ["departments", "roles", "employees"],
            when: (answers) => answers.action === "Add Department, Add Roles, Add Employees",

        },
           {
               type: "list",
               message: "What would you like to view?",
               choices: ["departments", "roles", "employees"],
               when: (answers) => answers.action === "View departments, roles, employees",
               name: "view"
           }

    ]) .then(function(answers) {
        console.log(answers)
       if (answers.add) {
           add(answers.add)
        // if (answers.add === "departments"){
        //     add("department")
        // }
        console.log("add")
       }

        else if (answers.view) {
            // view()
            console.log("view")
        }
        else {
            // update()
            console.log("update")
        }
        
    })
    // connection.query()
} 
 
function add(tableName, values) {
    let newObj
    let newArray
    if (tableName === "departments") {
        newArray = [
            {
                type: "input",
                message: "What department would you like to add?",
                name: "department"
            }
        ]
    } else if (tableName === "roles") {
        newArray = [
            {
            type: "input",
            message: "What is your role title?",
            name: "title"
    
    
           },
           {
               type: "input",
               message: "What is your salary?",
               name: "salary"
           },
           {
               type: "input",
               message: "What is your department id?",
               name: "departmentID"
           }
        ]
    }  
       else {
           newArray = [
               {
                   type: "input",
                   message: "What is employee's first name?",
                   name: "firstname"
               },
               {
                   type: "input",
                   message: "What is employee's last name?",
                   name: "lastname"
               },
               {
                   type: "input",
                   message: "What is the employee's role id?",
                   name: "roleid"
               },
               {
                   type: "input",
                   message: "What is the manager's id?",
                   name: "managerid"
               }
           ]
       }
    console.log(removePlural(tableName))
    let newTableName = removePlural(tableName)
    let question = `what ${newTableName} what would you like to add?`
    inquirer.prompt(newArray) .then(function(answers){
        console.log(answers)
        if (tableName === "departments") {
            newObj = {
                department_name: answers.department
            }
        } 
        else if (tableName === "roles") {
            newObj = {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.departmentID
            }
        
        }
        else if (tableName === "employees") {
            newObj = {
               first_name: answers.firstname,
               last_name: answers.lastname,
               role_id: answers.roleid,
               manager_id: answers.managerid
            }
        }
        var query = connection.query(
            `INSERT INTO ${newTableName} SET?`,
           newObj,
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
              // Call updateProduct AFTER the INSERT completes
              
            }
          );
    })

    
}

function removePlural(str) {
    let newStr = ''
for (let i = 0; i < str.length; i++) {
  if (i < str.length - 1) {
    newStr += str[i]
  }
}
  return newStr
}



