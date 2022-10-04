# BookMarks: Reading Notes

This project allows the user to create, edit, save, and delete their notes for upcoming book reports and tests.

**Link to project:** https://simple-bookmarks-api.herokuapp.com/

## How It's Made

**Tech used:** Embedded JavaScript (EJS), CSS, Node, Express, MongoDB, and deployed with Render.

# Required Dependencies

- `npm install`
- Create a `.env` file and add the following as `key = value`:
  - PORT = 8000 (can be any port example: 3000)
  - DB_CONNECTION = `your database URI`
- Add a .gitignore file with `.env` and `node_modules`

---

# Run

`npm start`

---

BookMarks was a project I made to further practice CRUD functions, such as creating a new note, reading or refreshing the currently stored data whenever a change is made, editing notes, and deleting a note from the database.

I utilized server-side JavaScript to connect the MongoDB database with the different CRUD functions and Embedded JavaScript Templating (EJS) on the client-side to render the HTML and CSS that the user sees.

## Optimizations

I would add user accounts with authentication, improved styling and responsiveness so the application can run across devices, and additional features for increased student engagement and learning, such as story maps or graphic organizers that they can interact with and customize.

## Lessons Learned

I learned how to utilize CRUD functions to interact with a database based on the user's request. I also implemented an auto refresh with a get request that redirects back the homepage or root route after a post or delete request has been made. The post and delete requests update the database and return updates to the terminal to demonstrate that the request was successful.

## Credits

Photo of Student from colorlib.com

## Other Projects

<table bordercolor="#66b2b2">
  <tr>
    <td width="33.3%"  style="align:center;" valign="top">
	<a target="_blank" href="https://github.com/jaclynbrothers/squawk-space">Squawk Space</a>
    	<br>
    	<a target="_blank" href="https://github.com/jaclynbrothers/squawk-space">
    	<img src="https://media.giphy.com/media/7dsiIBgG8OuU95SUvF/giphy.gif" width="100%"  alt="Squawk Space">
        </a>
    </td>
    <td width="33.3%" valign="top">
	<a target="_blank" href="https://github.com/jaclynbrothers/artist-portfolio">Artist Portfolio</a>
      	<br>
        <a target="_blank" href="https://github.com/jaclynbrothers/artist-portfolio">
          <img src="https://media.giphy.com/media/OtZnHQvpwaGOxKxoi1/giphy.gif" width="100%" alt="Artist Portfolio Website">
        </a>
    </td>
    <td width="33.3%" valign="top">
	<a target="_blank" href="https://github.com/jaclynbrothers/movie-recommendations-api">Movie Recommendations API</a>
        <br>
        <a target="_blank" href="https://github.com/jaclynbrothers/movie-recommendations-api">
          <img src="https://media.giphy.com/media/MkNt7t4yHfgI8bnwF9/giphy.gif" width="100%" alt="Movie Recommendations">
        </a>
    </td>
  </tr>
</table>
