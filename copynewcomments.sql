USE MyPosts;
CREATE TABLE BetterComments LIKE NewComments;
INSERT INTO BetterComments SELECT * FROM NewComments