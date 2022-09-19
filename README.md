# SuperDrip

A full stack app to keep track of supervised driving hours for student drivers, including night and highway hours. You are able to add each lesson individually, inputting the total number of hours driven for that lesson, and then how many were at night or on the highway. A log of all cumulative hours is displayed and previous lessons are editable.

**Link to project:** https://superdrip.herokuapp.com/

![Screenshot of SuperDrip Index Page](SuperDrip.png)

## How It's Made:

**Tech used:** HTML, CSS, TailwindCSS, EJS, JavaScript, Node.js, Express, MongoDB, and Passport for Authentication

My 17 year old son is about to start taking driving lessons to get his license. When I looked for apps to log these lessons they were either rated badly or overly complicated. I wanted just a simple log to keep track of his lessons, so I decided to create one. I used HTML and CSS for the front end, with EJS as a templating language and TailwindCSS to style it. On the backend I used JavaScript, Node.js, and Express. I chose MongoDB for my database and used Passport for login/logout and authentication.

The app name came from Supervised Driving Practice, **Super**vised **Dri**ving **P**ractice. It may vary by state, but in mine at least you have to submit forms certifying the number of hours you have driven with supervision, either by a parent or a driving instructor.

## Optimizations

I really want to keep this app very simple but in the future I'd like to add:
- A section for upcoming lessons
- A way to output lessons as proof for areas that require a log of your hours driven
- Linking to google calendar

## Lessons Learned:

I chose this app to practice styling using TailwindCSS rather than using plain CSS or using a Template.

## Needs Work:

Current issues that need fixing:
- Mobile formatting
- Add ability to edit date
- Max number of hours per day needs to be capped at 24
- Handle lessons of less than one, or not whole numbers
- Number of hours at night and on the highway should not exceed the total for the lesson
- Add styling to error messages or prompts
- Add favicon