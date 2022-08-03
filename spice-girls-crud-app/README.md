# Spice Girls Api
Here I created a Spice Girl's API.

<img src="../class39-materials/spice-girls-api-img.png" alt="screencapture of working api" width="200">

**Link to project:**  https://working-spice-girls-api.herokuapp.com/


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express.js,

<p> This Spice Girls API was built using Express.js and is being hosted on Heroku. This simple API allows anyone to consume this API effortlessly using cors. In this project I built a fullstack web application where we're able to listen for GET requests, and get files. This project is a good example of how we're able to look at query parameters on the request coming in. This project is live and the API can be consumed from anywhere in the world via postman or through clientside code making it beginner friendly.</p>

## Lessons Learned:
<p> When I first deployed the project I had an error with the port I set up to listen. I fixed the issue by having the server run on process.env.PORT || PORT to ensure the server is listening on not just my hard-coded port but on any port that Postman might designate. </p>

<p>Another lesson learned during this project is how important it is to adhere to cors policy, which you can do by simply including two lines of code. Servers have to be set up to handle requests from local files and adding cors allows every user to have access to consume the API. 
Error- Web Process failed to bind to port.</p>


