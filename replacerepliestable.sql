USE MyPosts;
DROP TABLE Replies;
CREATE TABLE Replies
	( ReplyID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    OriginCommentID INT,	
    InnerText VARCHAR(2500),
    AuthorID INT NOT NULL,
    Likes INT,
    Dislikes INT,
    DateAdded DATETIME DEFAULT CURRENT_TIMESTAMP, # Available as of MySQL 5.6.5
	DateModified DATETIME ON UPDATE CURRENT_TIMESTAMP # Available as of MySQL 5.6.5
    );
    