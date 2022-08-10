# Golden Goblet Lounge

<p align="center">
    <img src="https://img.shields.io/static/v1?label=|&message=HTML5&color=a33550&style=plastic&logo=html5"/>
    <img src="https://img.shields.io/static/v1?label=|&message=CSS3&color=a33550&style=plastic&logo=css3"/>
<!--     <img src="https://img.shields.io/static/v1?label=|&message=SASS&color=2b625f&style=plastic&logo=sass"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=BOOTSTRAP&color=316c5e&style=plastic&logo=bootstrap"/> -->
    <img src="https://img.shields.io/static/v1?label=|&message=JAVASCRIPT&color=35a34d&style=plastic&logo=javascript"/>
    <img src="https://img.shields.io/static/v1?label=|&message=NODE.JS&color=35a34d&style=plastic&logo=node.js"/>
    <img src="https://img.shields.io/static/v1?label=|&message=EXPRESS&color=35a34d&style=plastic&logo=express"/>
    <img src="https://img.shields.io/static/v1?label=|&message=EJS&color=35a34d&style=plastic&logo=ejs"/>
    <!-- <img src="https://img.shields.io/static/v1?label=|&message=REACT.JS&color=35a34d&style=plastic&logo=react"/> -->
    <!-- <img src="https://img.shields.io/static/v1?label=|&message=REACT.NATIVE&color=35a34d&style=plastic&logo=react"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=TYPESCRIPT&color=4a935c&style=plastic&logo=typescript"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=PYTHON&color=52985b&style=plastic&logo=python"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=JAVA&color=cdf998&style=plastic&logo=java"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=SOLIDITY&color=8fbc56&style=plastic&logo=solidity"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=SELENIUM&color=cdf998&style=plastic&logo=selenium"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=AWS&color=98bf53&style=plastic&logo=amazon"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=WORDPRESS&color=cdd148&style=plastic&logo=wordpress"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=ADOBE&color=98bf53&style=plastic&logo=adobe"/> -->
    <!-- <img src="https://img.shields.io/static/v1?label=|&message=MONGO-DB&color=359ba3&style=plastic&logo=mongodb"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=WEBPACK&color=bbb111&style=plastic&logo=webpack"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=LINUX&color=bbb111&style=plastic&logo=linux"/> -->
    <img src="https://img.shields.io/static/v1?label=|&message=GIT&color=359ba3&style=plastic&logo=git"/>
<!--     <img src="https://img.shields.io/static/v1?label=|&message=FIREBASE&color=cbb148&style=plastic&logo=firebase"/> -->
</p>

https://golden-goblet-lounge.herokuapp.com/

Find your next favorite cocktail using our latest search engine! Golden Goblet Lounge is a straightforward full-stack platform to search for recipes and track your favorites.

## How It's Made:

When the user enters the name or ingredient of a cocktail, our website sends a POST request to our server containing the name of their drink. Our server then parses the query parameter and uses the fetch method (via the node-fetch module) to send that information to a professional cocktail database. This database returns any matches, which are then converted to JSON and embedded in our EJS template.

https://www.thecocktaildb.com/api.php

Each recipe "card" is built dynamically with the information received, and designed using flexbox. They contain a bookmark icon, which saves the ID of the drink in the browser's localStorage. Cards that are bookmarked will appear brighter than the others, even after the user reloads the page.

Our site also features a "random" button, allowing the user to retrieve a random cocktail recipe from the database.

## Optimizations:

Golden Goblet Lounge has been tested for edge cases and refined. Several errors were discovered in the cocktail database, which impacted certain results negatively. We are unable to fix these at the source, so, where possible, we fixed them using EJS. The typical workflow for that involved splitting the strings into an array and correcting spacing or adding missing punctuation. As a result of our hard work, Golden Goblet Lounge is currently a fully functional search engine.

Future iterations will see the bookmark feature expanded. For example, the user will be able to click a "favorites" button to show a complete list of all their bookmarks. Keeping all their favorites in an easy-to-access location will improve the functionality of our website.

## Lessons Learned:

We learned a lot completing this website, which included both front-end and backend programming. It was extremely beneficial to write the code for both sides, as it helped us understand the client/server connection so much better.

In addition, EJS was a joy to work with, and we'll definitely be using it again in the near future. It saved us so much time by allowing us to create a template for each drink object without resorting to JavaScript for creating elements or duplicating nodes.

CSS in particular also required much attention, given the importance of the layout of each cocktail card. Careful consideration was given to each font, font size, padding, margin, etc. Flexbox was especially helpful as we worked to fit as much information in the compact space as possible, without hurting readability.

If you have any questions or comments, feel free to send me a message from my website. The link is on my Github homepage.