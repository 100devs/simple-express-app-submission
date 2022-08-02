#100Devs Simple Express App Submission

### Goal: Make Your Own CRUD APP and Push To Heroku

### How to submit your code for review:

- Fork and clone this repo
- Create a new branch called answer
- Checkout answer branch
- Push to your fork
- Issue a pull request
- Your pull request description should contain the following:
  - (1 to 5 no 3) I completed the challenge
  - (1 to 5 no 3) I feel good about my code
  - Anything specific on which you want feedback!

Example:
```
I completed the challenge: 5
I feel good about my code: 4
I'm not sure if my constructors are setup cleanly...
```
# Movie Rank Ver1
Movie Rank is where people can help build of a list and help to rank everyones favorite movies.

**Link to project:** https://movierankv1.herokuapp.com/

![movie rank](https://images4.imagebam.com/69/b3/91/MEBTATL_o.png)

## How It's Made:

**Tech used:** JavaScript, Node.js, Express, MongoDb, EJS, HTML, CSS

I used node/express to build the server to handle the request to add movies and add/remove user likes. Used MongoDb for my database to store the current list of movies and their like count. EJS was used to keep the front end up to date with current rankings and movies that are added/deleted.

## Optimizations

As the site is an ongoing project I plan to add user authentication to keep tract of user likes and to allow users to create their own personalized collection of favorite movies, in additonation to the community rankings, that they can share with frieds on social media etc..
(currently I am keeping track of user likes with local storage and IPs)

## Lessons Learned:

I learned to be very thoughtful and patient in testing your apps for proper performace across various browsers and devices. 