# source:  https://www.sqlshack.com/different-ways-to-sql-delete-duplicate-rows-from-a-sql-table/

USE MyPosts;

# create backup
/*
CREATE TABLE UsersBackup7292022 LIKE Users;

INSERT INTO UsersBackup7292022 SELECT * FROM Users;
*/
# to select duplicate rows, use this command:
/*
SELECT Username,
	Email,
	Website,
    IPADDRESS,
    COUNT(*) AS CNT
    FROM Users
    GROUP BY Username,
			Email,
			Website,
            IPADDRESS
	HAVING COUNT(*) > 1;
    
*/
/*
SELECT * FROM USERS
	WHERE UserID NOT IN 
    (
		SELECT MAX(UserID)
        FROM Users 
		GROUP BY Username,
				Email,
                Website,
                IPADDRESS
    );
*/
/*
SET SQL_SAFE_UPDATES = 0; # mysql 8 is buggy
DELETE t1 FROM Users t1
	INNER JOIN Users t2
    WHERE 
		t1.UserID < t2.UserID AND
        t1.Username = t2.Username AND
        t1.Email = t2.Email AND
        t1.Website = t2.Website;
SET SQL_SAFE_UPDATES = 1; # mysql 8 is buggy
*/

SELECT * FROM Users;
/*
SELECT Username, Email, Website, IPADDRESS, COUNT(Username) FROM Users
	GROUP BY Username 
	HAVING COUNT(Username) > 1;
*/

# to delete duplicate rows, use this command (n/a)
/*
DELETE FROM Users
	WHERE UserID NOT IN
		(
			SELECT SELECT Username,
			Email,
			Website,
			IPADDRESS,
			COUNT(*) AS CNT
			FROM Users
			GROUP BY Username,
					Email,
					Website,
					IPADDRESS
			HAVING COUNT(*) > 1;
			FROM Users
            GROUP BY
				Username,
				Email,
                Website,
                IPADDRESS
        );
*/