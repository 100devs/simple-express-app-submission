
# Pocket

A personal budget tracker app with passport local authorization. Add bills and multiple sources of income. See how your expenses break down daily, weekly, monthly, and yearly.

**Link to project:** https://pocket.cyclic.app


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** JavaScript, EJS, TailwindCSS

**Server:** Node, Express, MongoDB

**Dependencies:** bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

## Features

- Secure login with Passport Auth
- Add expenses and multiple sources of income
- Sort expenses by name, category, or cost
- See how expenses break down on a daily, weekly, monthly, and yearly basis
- Responsive for desktop & mobile


## Installation

Install with npm

```bash
  npm install bcrypt connect-mongo dotenv ejs express express-flash express-session mongodb mongoose morgan nodemon passport passport-local validator
```
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`PORT = <port>` (can be any port, ex: 3000)

### Database

`DB_STRING = <your MongoDB uri>`
## Optimizations

- User can select custom frequency for expenses and income streams (every x number of weeks/months)
- Made table data sortable
- Added Mongoose virtuals to calculate daily, weekly, monthly, and yearly cost of each expense without having to store all that data in the database
- Added soft delete so expenses aren't automatically purged from database in case user needs to restore data 

**Planned Features & Improvements:**

- Calcuate user's remaining funds
- Add budgeting and saving tips
- Add confirmation popups for deleting expenses, income, and account

## Other Examples of My Work

**Mailroom:** https://mailroom.cyclic.app

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


**Pictogram:** https://pictogram.cyclic.app

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

**myPetPal: ** https://mypetpal.onrender.com

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
