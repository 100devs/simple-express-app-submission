# Game Tracker app
This app keeps track of all the games you want to play or have completed and store them in a database

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express.js, ejs, mongodb

this app uses ejs template engine to generate a html page using the data from the provided by the server. when the form is submitted, the server stores the data in a mongodb database and when the page reloads the updated data is fetched and rendered into html document using the ejs template. you can also update the game status to completed or delete the entry which will be reflected in the database


## Lessons Learned:

Create and connect to mongodb database, create, update, delete document methods form mongodb.

## To run app
 * After cloning the repo, in terminal run npm install
 * create a .env file in the root folder
 * Get your database string from MongoDB and add it to the .env file under DB_STRING variable
 * to run the app, use node server.js



