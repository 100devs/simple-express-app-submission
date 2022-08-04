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

heroku git:remote -a name-of-app

git add .
git commit -m "ready for heroku"
git push heroku master

//Create a Procfile to give Heroku instructions on how to run your app
touch Procfile
    web: node index.js

index.js  
    var PORT = process.env.PORT || 5000;

git push heroku master