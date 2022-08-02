USE MyPosts;

DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments LIKE BetterComments;
INSERT INTO Comments SELECT * FROM BetterComments;
SELECT * FROM Comments;