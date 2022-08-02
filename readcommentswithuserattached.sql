USE MyPosts;

SELECT * FROM Comments
WHERE Comments.OriginPostID = 1
INNER JOIN Users ON Users.UserID = Comments.AuthorID

