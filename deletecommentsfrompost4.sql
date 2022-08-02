USE MyPosts;
/*
ALTER TABLE Comments
ADD FOREIGN KEY (OriginPostId ) REFERENCES Posts(PostID);*/
/*

ALTER TABLE Comments
ADD FOREIGN KEY (AuthorID) REFERENCES Users(UserID);
*/
DELETE FROM Comments WHERE Comments.OriginPostID = 4; DELETE FROM Posts WHERE Posts.PostID = 4;