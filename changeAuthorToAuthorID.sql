USE MyPosts;
/*
OLD USERS TABLE:

CREATE TABLE Comments
	( CommentID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
		OriginPostID INT,
        InnerText VARCHAR(2500),
        Author VARCHAR(250),
        Likes INT,
        Dislikes INT,
        RepliesCount INT,
        DateAdded DATETIME DEFAULT CURRENT_TIMESTAMP, # Available as of MySQL 5.6.5
		DateModified DATETIME ON UPDATE CURRENT_TIMESTAMP # Available as of MySQL 5.6.5
			);
            
NEW USERS TABLE:

CREATE TABLE Comments
	( CommentID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
		OriginPostID INT,
        InnerText VARCHAR(2500),
        AuthorID INT NOT NULL,
        Likes INT,
        Dislikes INT,
        RepliesCount INT,
        DateAdded DATETIME DEFAULT CURRENT_TIMESTAMP, # Available as of MySQL 5.6.5
		DateModified DATETIME ON UPDATE CURRENT_TIMESTAMP # Available as of MySQL 5.6.5
			);

*/
#SELECT Author from Users;
DROP TABLE IF EXISTS NewComments;
CREATE TABLE IF NOT EXISTS NewComments 
(CommentID INT auto_increment NOT NULL PRIMARY KEY,
OriginPostID INT,
InnerText VARCHAR(2500),
AuthorID INT,
Likes INT,
Dislikes INT,
RepliesCount INT,
DateAdded DATETIME DEFAULT CURRENT_TIMESTAMP, # Available as of MySQL 5.6.5
DateModified DATETIME ON UPDATE CURRENT_TIMESTAMP # Available as of MySQL 5.6.5
);

INSERT INTO NewComments (CommentID, OriginPostID, InnerText, Likes, Dislikes, RepliesCount, DateAdded, DateModified)
	(
		SELECT CommentID, OriginPostID, InnerText, Likes, Dislikes, RepliesCount, DateAdded, DateModified
			FROM Comments
    );
    
    
SELECT Comments.CommentID, Comments.Author, Users.UserID, Users.Username, Users.IPADDRESS, Users.Website FROM Comments
INNER JOIN Users
	ON Comments.Author = Users.Username;
SET SQL_SAFE_UPDATES = 0; # mysql 8 is buggy
UPDATE NewComments AuthorID,
	Users,
    Comments
SET AuthorID = Users.UserID
WHERE Users.Username = Comments.Author;
SET SQL_SAFE_UPDATES = 1; # mysql 8 is buggy

SELECT * FROM NewComments;
