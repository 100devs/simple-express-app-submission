USE MyPosts;
/*
CREATE TABLE Users 
	(UserID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	Username varchar(250) NOT NULL,
    Email varchar(250) NOT NULL,
    Website varchar(250), 
    IPADDRESS varchar(250)
    );
CREATE TABLE UserAuthorsOnly
(
	AuthorID INT auto_increment NOT NULL PRIMARY KEY,
    Author varchar(250)
);

# duplicates comments;
CREATE TABLE CommentsCopy
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
            */



/*
SELECT Author
	INTO UserAuthorsOnly
	FROM Comments;
*/

/*
# insert users from comments.
INSERT INTO Users (UserName, Email, Website, IPADDRESS)
	SELECT Author, 'wrkerr9@gmail.com', 'n/a', '127.0.0.1' FROM Comments;
*/
# How to delete duplicate users

SELECT  Username, Email, Website, IPADDRESS
FROM Users
GROUP BY Username, Email, Website, IPADDRESS
HAVING COUNT > 1;