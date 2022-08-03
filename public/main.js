// main.js
const addQuote = document.querySelector('#addQuote')

// const deleteButton = document.querySelector('#delete-button')
//const messageDiv = document.querySelector('#message')


addQuote.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      author: document.getElementsByName('author')[0].value,
      quote: document.getElementsByName('quote')[0].value,
    })
  })
  .then(res=> {
    if (res.ok) return res.json()
  })
  // .then(response => {
  //   window.location.reload(true) //tried commenting out to see if fixed double-posting issue (it did not, but still works otherwise, maybe we don't need this)
  // })
})


// deleteButton.addEventListener('click', _ => {
//   fetch('/quotes', {
//     method: 'delete',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       name: 'Darth Vader'
//     })
//   })
//   .then(res => {
//     if (res.ok) return res.json()
//   })
//   .then(response => {
//     if(response === 'No quote to delete'){
//       messageDiv.textContent = 'No Darth Vader quote to delete'
//     }else{
//       window.location.reload(true)
//     }
//   })
// })