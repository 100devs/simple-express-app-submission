let deleteButtons = Array.from(document.getElementsByClassName("delete"));
let likeButtons = Array.from(document.getElementsByClassName("like"));

// Both of these declarations are doing the same basic thing: using getElementsByClassName() to select all of the relevant DOM elements.  getElementsByClassName returns those elements as an HTMLCollection, which isn't quite the same thing as an array.
// Since we're going to need to iterate through the lists of buttons, we convert the HTMLCollections into arrays using Array.from()

deleteButtons.forEach((button) => button.addEventListener("click", deleteGame));
likeButtons.forEach((button) => button.addEventListener("click", addLike));

// Again, the same method is being applied to both arrays:  forEach() iterates through them and attaches an eventListener to each element

async function addLike() {
  const gTitle = this.parentNode.parentNode.childNodes[1].innerText; // "this" refers to the button that was pressed. What's happening here is that the code is walking up its family tree to find the parentNode (in this case, the td element that contains the button), and then looks at the td's parentNode (the tr element).  Then it looks back down the tree to find a particular childNode and selects that the childNode contains.  That is the value that's being assigned to "sName"
  try {
    const response = await fetch("addLike", {
      // Here we're building our fetch request.  It starts with the endpoint and continues with the contents of the request object:  basically, the information that is going to be sent to the server.
      method: "put", // The server needs to know what we're trying to do
      headers: { "Content-Type": "application/json" }, // The server also needs to know what format the data is coming in (this is VERY IMPORTANT)
      body: JSON.stringify({
        // And here's where the body of the request is built: JSON.stringify() takes the object and turns it into a JSON
        gameTitleS: gTitle, // It's critical that the key name given here match the key we told the app.put() method to look for:  check the server.js file if you're unsure!
      }),
    });
    const data = await response.json(); // response.json() on the client-side does the OPPOSITE of its server-side twin:  here it's taking a JSON input and parsing it to produce a JavaScript object (which will be assigned to the variable name "data")
    console.log(data); // The response (now in the form of a JavaScript object) is logged to the console
    location.reload(); // the page is refreshed (making another "GET" request to the server)
  } catch (error) {
    console.log(error);
  }
}

// And everything that's happening here is exactly the same as what happened above.  Only the method and endpoint differ.

async function deleteGame() {
  const gTitle = this.parentNode.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch("deleteGame", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameTitleS: gTitle,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
