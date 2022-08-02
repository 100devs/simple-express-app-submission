# SQL injection attempt
USE customers;

INSERT INTO Persons (LastName, FirstName, Address, City) 
	VALUES ('Biden', '; DROP TABLE *;', '1600 Pennsylvania Avenue, N.W. Washington, DC 20500', 'Washington, DC');