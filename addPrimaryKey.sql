USE customers;
ALTER TABLE Persons
	ADD COLUMN PersonId INT;
alter TABLE Persons
    ADD PRIMARY KEY (PersonId);
    