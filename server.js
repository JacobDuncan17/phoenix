const mysql = require('mysql2');
const inquirer = require('inquirer');

const EmployeeDb = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db'
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

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Upadate an employee role':
                    editEmployee();
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
    EmployeeDb.query('SELECT roles.id, roles.title, departments.title AS department, roles.salary FROM roles lEFT JOIN departments ON roles.department_id = departments.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        app();
    })
}

function employees() {
    EmployeeDb.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.title AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        app();
    })
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            input: 'input',
            message: 'Enter the name of the department:'
        })
        .then((answer) => {
            EmployeeDb.query(
                'INSERT INTO Departments SET ?',
                {
                    title: answer.name
                },
                (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department has been added.`);
                app();
                }
            );   
        });
}

function addRole() {
    EmployeeDb.query('SELECT title FROM Departments', (err, res) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'title',
                input: 'input',
                message: 'Enter the name of the role to add:'
            },
            {
                name: 'salary',
                input: 'input',
                message: 'Enter salary for the role:',
            },
            {
                name: 'department',
                type: 'list',
                message: 'Select the department for the role:',
                choices: res.map(department => department.title)
            },
        ])
        .then((answer) => {
            EmployeeDb.query(
                'SELECT id FROM Departments WHERE title = ?',
                [answer.department],
                (err, res) => {
                    if (err) throw err;

                    EmployeeDb.query(
                        'INSERT INTO Roles SET ?',
                        {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: res[0].id
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} role has been added.`)
                            app();
                        }
                    ); 
                }
            );
        });
    });

}

function addEmployee() {
    EmployeeDb.query('SELECT * FROM roles', (err, roles) => {
        if(err) throw err;
        EmployeeDb.query('SELECT * FROM employees', (err, employees) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'firstName',
                        input: 'input',
                        message: 'Enter first name of the employee:'
                    },
                    {
                        name: 'lastName',
                        input: 'input',
                        message: 'Enter last name of the employee:',
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: 'Choose the employees roles:',
                        choices: roles.map(role => role.title),

                    },
                    {
                        name: 'manager',
                        type: 'list',
                        message: 'Choose the employees manager:',
                        choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`),
                    },
                ])
                .then((answer) => {
                    const roleId = roles.find(role => role.title === answer.role).id;
                    const managerId = employees.find(employee => `${employee.first_name} ${employee.last_name}` === answer.manager).id;
                    EmployeeDb.query(
                        `INSERT INTO employees SET ?`,
                        {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: roleId,
                            manager_id: managerId,
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} employee has been added.`)
                            app();
                        }
                    );
                });
        });
    });
}

function editEmployee() {
    EmployeeDb.query('', (err, res) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: '',
                input: '',
                message: ''
            },
            {
                name: '',
                type: '',
                message: '',
                choices: '',
            },
        ])
        .then((answer) => {
            EmployeeDb.query(
                '',
                [],
                (err, res) => {
                    if (err) throw err;
                }
            );
        });
    });

}