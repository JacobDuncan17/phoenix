USE employees_db;

INSERT INTO Departments (title)
VALUES
('Accounting'),
('I.T.'),
('Marketing'),
('Human Resources');

INSERT INTO Roles (title, salary, department_id)
VALUES
('Accountant', 55000, 1),
('Lead Accountant', 80000, 1),
('Systems Administrator', 60000, 2),
('Systems Engineer', 100000, 2),
('Software Engineer', 125000, 2),
('IT Director', 175000, 2),
('Marketing Coordinator', 450000, 3),
('Marketing Manager', 70000, 3),
('Human Resource Specialist I', 40000, 4),
('Human Resource Specialist II', 55000, 4),
('Human Resource Manager', 85000, 4);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES
('Joe','Bob', 1, 1),
('Bob','Joe', 2, NULL),
('Justin','Van', 3, 6),
('Matt','Terr', 4, 6),
('Diego','Cast', 5, 6),
('Tony','Ave', 6, NULL),
('Ann','Bur', 7, 8),
('Tom','Smith', 8, NULL),
('Derek','Evans', 9, 11),
('Isaac','Mor', 10, 11),
('Adam','Ferr', 11, NULL);
