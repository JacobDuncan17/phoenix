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
            switch (answer.action) {
                case 'View all departments':
                    departments();
                    break;
                
                case 'View all roles':
                    roles();
                    break;
              
                case 'View all employees':
                    employees();
                    break;
            }
        })
}

function departments() {
    EmployeeDb.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        app();
    });
}

function roles() {
    EmployeeDb.query('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles lEFT JOIN departments ON roles.department_id = departments.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        app();
    })
}

function employees() {
    EmployeeDb.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        app();
    })
}

