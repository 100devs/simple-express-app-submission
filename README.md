<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Bookly</h3>

  <p align="center">
    A CRUD app that allows users to track books read and information in an Apple Music / Spotify UI design.
    <br />
    <a href="https://github.com/danjkim21/bookly-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://bookly-crud-app.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/danjkim21/bookly-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/danjkim21/bookly-app/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
  <img src="public/images/bookly-demo.gif" width="75%" alt="space app recording"/>
</p>

So many books, so little time! I find new books to read faster than I can read them. Keeping track of all of them and remembering the order I want to read them can be cumbersome (plus I'm very forgetful and can't remember the books that I've read). 

I created this app based around creating and organizing "book playlists" similar to how Apple Music and Spotify shows your queued songs. 

### How It's Made

**Tech used:**

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)

The Book data comes from the [Google Books API](https://developers.google.com/books/docs/v1/using) and the [NYTimes Books API](https://developer.nytimes.com/docs/books-product/1/overview). Books added to your playlist are saved to MongoDB.

<!-- GETTING STARTED -->

## Getting Started

This API can be accessed via [https://bookly-crud-app.herokuapp.com/](https://bookly-crud-app.herokuapp.com/) or as a local copy. To get a local copy up and running follow these simple example steps.

### Installation

1. Create new MongoDB project and connect to your new project

2. Create a .env file and add your MongoDB connection string to it (DB_STRING)

3. Create Google and NYTimes Developer acccounts, and generate API keys

4. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
5. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->

### Usage

1. Run server
   ```sh
    node server.js
    npm run dev  // nodemon command
   ```
2. Navigate to server
   ```sh
   `localhost:8000`
   ```

<!-- ROADMAP -->

## Roadmap

- [x] Create books page displaying all finished books
- [x] Create Discover books feature (Search Page)
- [ ] Rate finished books and add book notes
- [ ] Sorteable playlist (drag and drop and sort) feature
- [ ] Login 
- [ ] Create multiple different playlists

See the [open issues](https://github.com/danjkim21/adv-nuclear-reactor-api/issues) for a full list of proposed features (and known issues).

## Lessons Learned:

My biggest take away is how important it is to define a project MVC and UI/UX design prior to building out and developing any full stack web application. There were several times throughout the build process where I needed to go back and review the logic of my project design, to which there was none. In the future, I'll make sure to write out and define my project MVC, and using Figma to craft my project design to prevent the need to backtrack. 

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Your Name - [@devdanielk](https://twitter.com/devdanielk) - dan.jkim21@gmail.com

Project Link: [https://github.com/danjkim21/bookly-app](https://github.com/danjkim21/bookly-app)

Live Link: [bookly-crud-app.herokuapp.com/](bookly-crud-app.herokuapp.com/)


<p align="right">(<a href="#top">back to top</a>)</p>
