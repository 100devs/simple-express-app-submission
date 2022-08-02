# Talk in Corporate
## How do you professionally say...?

This API returns what you might mean to say, what it should sound like in "corporate speech", and a category for that entry. It's meant in good fun and inspired by the content of [Laura](https://www.instagram.com/loewhaley/) on Instagram and TikTok.

Entries can also be submitted, viewed, searched, and sorted by category on the project's main page.

*Coming soon: user authentication.*

**Link to project:** https://talkincorporate-api.herokuapp.com/<br>
**API documentation:** https://talkincorporate-api.herokuapp.com/doc

![screenshot of the home page](https://user-images.githubusercontent.com/91985540/182052320-7383fd9f-567c-4eec-91ef-68ab8721812a.png)

## Table of Contents

- [Link to project](https://talkincorporate-api.herokuapp.com/)
- [API documentation](https://talkincorporate-api.herokuapp.com/doc)
- [Table of contents](#table-of-contents)
- [How it's made](#how-its-made)
- [Set up](#set-up)
- [Folder Structure](#folder-structure)
- [Limitations](#limitations)
- [Optimizations](#optimizations)
- [Lessons learned](#lessons-learned)
- [Credits](#credits)

## How It's Made:

**Tech used:** `HTML`, `CSS`, `JavaScript`, `MongoDB`/`Mongoose`, `Express`, `NodeJS`

Due to the simplicity of the website, I used pure CSS with *grid* and *flexbox* to make it light and responsive without media queries.

On the back end, the Express framework adds readability to NodeJS and makes it easy to integrate with the EJS template engine. Not only that, but the process of creating routes and controllers is very straightforward.

Mongoose was chosen for out-of-the-box validation and abstraction of most of the MongoDB code. Its Schemas are an interesting practice of the M (models) of an MVC system.

## Set up

1. `git clone https://github.com/raissa-k/talkincorporate.git`
2. `npm install`
3. Set up .env with your own MONGODB_URL
4. `npm run dev`

### `npm run dev`

Runs in the development mode.
<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Folder structure

After cloning this repository, it should look like this:

```md
.
├── controllers
│ ├── api-controllers.js
│ └── browser-controllers.js
├── models
│ └─ entry.js
├── public
│ └─ [stylesheets, favicon, main.js]
├── routes
│ ├── api-routes.js
│ └── browser-routes.js
├── views
│ ├── crud.ejs
│ └── doc.ejs
│ └── index.ejs
├── node_modules
│ ├── [...]
├── package.json
├── server.js
└── [.gitignore, package-lock.json, README.md]
```
Once the MONGODB_URL value is defined in the .env file you will be able to populate your own collection of entries.

## Limitations

For security reasons I modified the JSON returned from API requests not to include the document IDs, which are necessary for updating and deleting entries in the database.

For now, since I not only wanted to set up a RESTful web API but also make the entries visible and searchable from a user on the home page, the most time-consuming roadblock I found was getting the PATCH and DELETE methods to work with forms. A little research redirected me to the Express middleware "method-override", and after a few tries and tweaks I could finally get it working the way I had envisioned. IDs are still required and so the PATCH and DELETE methods are available to the general user, but the functions are in place to be redesigned once authentication is implemented. 

## Optimizations

Possible future improvements include adding user authentication so that each user can edit and delete their own entries from the website.

## Lessons Learned:

This was a great practice in MVC architecture. As I began building this project, the server.js file started to become difficult to read and keep in order, and so creating separate routes and controllers for the API and page renders helped keep it neat and still open to further improvement.

## Credits:
- [Laura](https://www.instagram.com/loewhaley/) for the content.
- [apiDOC](https://apidocjs.com/) for the base of the documentation page.
