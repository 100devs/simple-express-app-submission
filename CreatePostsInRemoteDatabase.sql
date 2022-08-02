USE sql3509839;
CREATE TABLE Posts
	( PostID int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	PostTitle MEDIUMTEXT NOT NULL,
    PostSubtitle MEDIUMTEXT,
    PostMainBody LONGTEXT,
    PostConclusion MEDIUMTEXT,
    PostCommentCount INT,
    DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP # Available as of MySQL 5.6.5
    );
    
CREATE TABLE Comments
	( CommentID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
		OriginPostID INT,
        InnerText VARCHAR(2500),
        AuthorID INT NOT NULL,
        Likes INT,
        Dislikes INT,
        RepliesCount INT,
        DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP # Available as of MySQL 5.6.5
			);
CREATE TABLE Replies
	( ReplyID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    OriginCommentID INT,	
    InnerText VARCHAR(2500),
    AuthorID INT NOT NULL,
    Likes INT,
    Dislikes INT,
    DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP # Available as of MySQL 5.6.5
    );
    
CREATE TABLE Users 
	(UserID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	Username varchar(250) NOT NULL,
    Email varchar(250) NOT NULL,
    Website varchar(250), 
    IPADDRESS varchar(250)
    );