# Pokémon Team Builder

My Pokémon Team Builder project is a full stack web application built using JS, Node.js, Express, EJS and MongoDB. It stores team data as JSON in a connected Mongo database, containing core information such as name, levels, ability and moveset data. The stored data is then rendered into the DOM using an Embedded Javascript template in a list of team cards. Pokémon data is extracted from the PokéAPI and PokemonDB following a matching input query from the user and allows for 8 generations of Pokémon data to be embedded, with the exception surrounding a few entries such as Legends: Arceus Pokémon. 

Project is deployed on Heroku and is being continually updated: https://sean-poke-team-builder.herokuapp.com/

![Screenshot 2022-07-02 214307](https://user-images.githubusercontent.com/101055915/177015697-a008e933-bbbc-494e-ae2b-0ed2016a8ed6.jpg)

# Prerequisite packages:
- Express
- MongoDB
- Dotenv
- EJS

# Features I would still like to add
- <del>Functional favourite button</del> ✔️
- Capped team length of 6 document entries in Mongo.DB
- Potentially unique teams with the ability to make a new trainer, possibly with an authentication system
- On hover tooltips with descriptions of moves and abilities (added tooltips for some elements so far)
- Mobile responsiveness
