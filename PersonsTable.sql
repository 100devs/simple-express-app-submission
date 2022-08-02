USE customers;

CREATE TABLE Persons
	( PersonID int AUTO_INCREMENT PRIMARY KEY,
      LastName varchar(255),
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255)
	);