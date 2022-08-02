# this is how to join two tables with a one to many relationship
USE MyPosts;
SELECT * FROM Posts
	INNER JOIN Comments WHERE Comments.OriginPostID = Posts.PostID AND Posts.PostID = 1;