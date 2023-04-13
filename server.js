const mysql = require('mysql');
const inquirer = require ('inquirer');

const EmployeeDb = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'root',
    database: 'employees'
});

EmployeeDb.connect((err) => {
    if (err) throw err;
    console.log('Connected to Employees Database')
    app();
})

function app() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Where would you like to go?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'End'
            ]
        })
        .then ((answer) => {

        })
}
