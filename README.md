# 100 Devs Project Database
This is a full stack app designed to house projects built by myself and colleagues from the 100 Devs Agency. This database displays uploaded projects, with the ability for site visitors to add their own projects to grow the database.

![image of the project database with cards displaying inital projects.](https://github.com/katieleebrown/project-database/blob/main/public/images/screenshotOne.JPG?raw=true)

# Why It's Made:
This project was built to test my bootstrap skills, practice creating a fullstack app with express and hosting through heroku. I was hoping to build a site that would be collaborative, while also providing inspiration for future agency projects.

# How It's Made:
Tech Used: EJS, JS, Bootstrap, Node.js, Express, MongoDB

This is a very basic create and read app. It relies heavily on express and bootstrap for the project, and was created in two days as a quick side app.

# Optimizations
This project was a very big test in taking form data and pushing it correctly to the database. I initially struggled getting the checkbox data from the form to parse correctly as an array. While my first version of this app used document.querySelectorAll to pull all of the checked boxes, push to an array, and then send that array to mongoDB, I was able to update my ejs file to do the heavy lifting by adding a name tag to all of my checkbox inputs, and then use request.body... to pull all of the checked values for more streamlined code.

![image of the database submission form.](https://github.com/katieleebrown/project-database/blob/main/public/images/addProject.JPG?raw=true)

# Lessons Learned
I hit a bug or two trying to push my code to heroku, and spent quite a bit of an afternoon debugging my code to make sure the app was running smoothly. I learned quite a few things from this - first, make sure you have the correct settings in your database to make it accessible not only on your local machine. Second, searching through heroku logs (and copy and pasting it into google) is often one of the fastest ways to get things up and running. Eventually, I removed my node_modules folder, ran 'npm i' in the terminal to re-install the modules, and this updated the code to run successfully. Thanks, Stack Overflow!

# Credit & Copyright
- All projects on the cards are built by their respective developers from the 100 Devs Agency. 
- This site was designed and built in it's entirety by me, Katie Brown. 