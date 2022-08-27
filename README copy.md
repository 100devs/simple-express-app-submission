# My Awesome Project
This application takes a movie input along with a rating and creates a sorted list of movies to watch in order of importance. Users are able to click that they have seen a movie, which updates its priority to -1 and crosses it out.


![alt text](/images/codePreview1.gif)
[Live Site] https://movie-watchlist2.herokuapp.com/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node, Heroku, Netlify

This code was built on the shell of a basic CRUD infrastructure.  The list elements are created using EJS parsing data from MongoDB. CSS is used for some styling with flexbox. The server is run on Node which updates the database so users can refresh the page without losing content. It is hosted on Netlify. 

## Optimizations
*(optional)*

Right now the site only works for a single individual cluster and does not use any caching to create client-specific lists. 

Need to add functionality for hovering cross-out and cross-out after being seen. 

## Lessons Learned:

Creating a resource on a server can be either hardcoded or submitted through forms or other inputs. 



