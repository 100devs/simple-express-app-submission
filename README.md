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



# Flick Freak - API Mock Up
A self-reported movie tracking database. Note the movies you want to see, and track the number of times you've seen a movie. Never forget if you've seen a movie again!

**Link to project:** coming soon

![alt tag](http://placecorgi.com/1200/210)

## How It's Made:

**Tech used:** EJS, Node, Express, MongoDB

Mock-up with EJS framework. First, I built the API to handle the updates to the MongoDB that tracks a movie's name, if it's been watched or not, and the watch date. This info is then rendered on the front end, with filters on the watched boolean, to place a movie in the "WatchList" or the "WatchedList". No movie that has been seen can be deleted, as you can't unsee a movie no matter how hard you might try.

## Optimizations
Need to select a more modern framework for the front end. Currently working towards base features. 

## Lessons Learned:

Originally started this project storing the date the movie was watched. May scrap this idea, as storing the dates as strings and converting back to dates for the front end was posing some unique challenges, and created some issues with future features of importing existing movies watched.