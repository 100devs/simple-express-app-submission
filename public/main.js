//main.js

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
  fetch('/quotes', { //set endpoint to /quotes because that is where we are sending the request to - when the user clicks the update button, fetch the quotes.
    method: 'put', //sending a put request
    headers: { 'Content-Type': 'application/json' }, //tell the server we're sending JSON data 
    body: JSON.stringify({
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.'
    })
  })
    .then(res => { //remember to write a then after fetching because fetch returns a promise. then is how we will handle the response of the fetch.
      if (res.ok) return res.json() //if response from fetch has a status:200 (is ok), return the response as JSON
    })
    .then (response => { 
      // console.log(response) //then take that response as JSON and console log it.
      window.location.reload(true)
    })
    .catch(error => console.log('error is:', error))
})

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', { //when the user clicks on the delete button, fetch the quotes.
    method: 'delete', //sending a delete request.
    headers: { 'Content-Type': 'application/json' }, //tell the server we will be sending JSON data
    body: JSON.stringify({
      name: 'Darth Vadar' //find the quote with the property name and value 'Darth Vadar'
    })
  })
    .then(res => {
      if (res.ok) return res.json() //if fetch was success and we got the response ok, return that response as JSON
    })
    .then(response => {
      if (response === 'No quote to delete') { //if our delete request did not find a  property name with value 'Darth Vadar' 
        messageDiv.textContent = 'No Darth Vadar quote to delete' //change the div #message to show this text
      } else {
        window.location.reload(true)
      }
    })
    .catch(console.error)
})