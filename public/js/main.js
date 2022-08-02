const deleteBtn = document.querySelectorAll('.fa-trash') // creating nodelist for all trash icons
const item = document.querySelectorAll('.item span') // creates nodelist for .item spans 
const itemCompleted = document.querySelectorAll('.item span.completed') // creates nodelist for all objects with the assigned class of "completed and item"

Array.from(deleteBtn).forEach((element)=>{ //creating an array of the nodelist and starting a function 
    element.addEventListener('click', deleteItem) // assigning an event listener to all deletebtn variables created above
})

Array.from(item).forEach((element)=>{  //creating an array of the nodelist item and starting a function 
    element.addEventListener('click', markComplete) // assigning an event listener to all item variables created above
})

Array.from(itemCompleted).forEach((element)=>{ //creating an array of the nodelist itemcompleted itemCompleted and starting a function
    element.addEventListener('click', markUnComplete) // assigning an event listener to all itemCompleted variables created above
})

async function deleteItem(){ //creating async function 
    const itemText = this.parentNode.childNodes[1].innerText //sets itemtext to selected text from DOM
    try{ // executes first
        const response = await fetch('deleteItem', { // sets up a fetch item
            method: 'delete', //assigns the method to delete
            headers: {'Content-Type': 'application/json'}, //sets the content type to json
            body: JSON.stringify({ // converts json to a more readable format
              'itemFromJS': itemText // sets itemsfromjs to whatever was in the grabbed text
            })
          })
        const data = await response.json() // waits for the server file to respond and assigns the response to "data"
        console.log(data) // console logs the data
        location.reload() // reloads the dom

    }catch(err){ // if an error is found
        console.log(err) // console log the error
    }
}

async function markComplete(){ //creating async function 
    const itemText = this.parentNode.childNodes[1].innerText //sets itemtext to selected text from DOM
    try{ // executes first
        const response = await fetch('markComplete', { // sets up a fetch item
            method: 'put', //assigns the method to put
            headers: {'Content-Type': 'application/json'}, //sets the content type to json
            body: JSON.stringify({ // converts json to a more readable format
                'itemFromJS': itemText // sets itemsfromjs to whatever was in the grabbed text
            })
          })
        const data = await response.json() // waits for the server file to respond and assigns the response to "data"
        console.log(data) // console logs the data
        location.reload() // reloads the dom

    }catch(err){ // if an error is found
        console.log(err) // console log the error
    }
}

async function markUnComplete(){ //creating async function 
    const itemText = this.parentNode.childNodes[1].innerText //sets itemtext to selected text from DOM
    try{ // executes first
        const response = await fetch('markUnComplete', { // sets up a fetch item
            method: 'put', //assigns the method to put
            headers: {'Content-Type': 'application/json'}, //sets the content type to json
            body: JSON.stringify({ // converts json to a more readable format
                'itemFromJS': itemText // sets itemsfromjs to whatever was in the grabbed text
            })
          })
        const data = await response.json() // waits for the server file to respond and assigns the response to "data"
        console.log(data) // console logs the data
        location.reload() // reloads the dom

    }catch(err){ // if an error is found
        console.log(err) // console log the error
    }
}