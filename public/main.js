const submit = document.querySelector('#submit-button')
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const deleteAllButton = document.querySelector('#delete-all-button')
const inputName = document.querySelector('#input-name')
const inputQuote = document.querySelector('#input-quote')

// const title = document.querySelector('#title').innerText
// console.log(title)

let casedInputName = []
let nameNeeded 

// let capitalizer = function(nameNeeded){
//   let splitInputName = nameNeeded.toLowerCase().split('')

//   splitInputName[0] = splitInputName[0].toUpperCase()

//   splitInputName = splitInputName.join('')


  // for (let i = 0; i< splitInputName.length; i++){
  //   if (i === 0){
  //     casedInputName.push(splitInputName[0].toUpperCase())
  //   }else{
  //     casedInputName.push(splitInputName[i])
  //   }
  // }

  // casedInputName.join('')

// }

//const listName = document.querySelector('#listName')

let listQuantity = document.querySelectorAll('.listItem')

let listNames = []
let listNumbers = []
let deleteButtons = []
let strikethroughButtons = []
let listBoolean = []

for(let i = 0; i < listQuantity.length; i++){

  listNames[i] = document.querySelector(`#listName${i}`)

  listNumbers[i] = document.querySelector(`#listNumber${i}`)

  listBoolean[i] = document.querySelector(`#boolean-value-${i}`).innerText

  deleteButtons[i] = document.querySelector(`#delete-listing-button-${i}`)

  strikethroughButtons[i] = document.querySelector(`#stikethrough-button-${i}`)


  deleteButtons[i].addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${listNames[i].innerText}`,
        })
        
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        console.log(response)
        window.location.reload(true)
      })
  })

  if (listBoolean[i] === 'true'){

    listNames[i].classList.toggle('strikethrough')
    listNumbers[i].classList.toggle('strikethrough')

  }


  strikethroughButtons[i].addEventListener('click', _ => {

    console.log(listBoolean[i])

      if (listBoolean[i] === 'false'){
        console.log('listBoolean is false')

          fetch('/quotes', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: `${listNames[i].innerText}`,
                st: false,
              })

          })
          .then(res => {
              if (res.ok) return res.json()
            })
            .then(response => {
              console.log(response)
              window.location.reload(true)
            })
      }
      else if (listBoolean[i] === 'true'){
        console.log('listBoolean is true')
        listNames[i].classList.toggle('strikethrough')
        listNumbers[i].classList.toggle('strikethrough')
        fetch('/quotes', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${listNames[i].innerText}`,
            st: true,
          })

      })
      .then(res => {
          if (res.ok) return res.json()
        })
        .then(response => {
          console.log(response)
          window.location.reload(true)
        })
      }

  
  })
}

// for(let i = 0; i < listQuantity.length; i++){



// }


// update.addEventListener('click', _ => {
//     fetch('/quotes', {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: inputName.value,
//           quote: inputQuote.value
//         })
        
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//       })
//       .then(response => {
//         console.log(response)
//         window.location.reload(true)
//       })
// })


// deleteButton.addEventListener('click', _ => {
//   fetch('/quotes', {
//       method: 'delete',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: inputName.value,
//       })
      
//   })
//   .then(res => {
//       if (res.ok) return res.json()
//     })
//     .then(response => {
//       console.log(response)
//       window.location.reload(true)
//     })
// })

// deleteAllButton.addEventListener('click', _ => {
//   fetch('/quotes', {
//     method: 'delete',
//     headers: { 'Content-Type': 'application/json' },

//   })
//     .then(res => {
//       if (res.ok) return res.json()
//     })
//     .then(response => {
//     if (response === 'No quote to delete') {
//     } else {
//       window.location.reload(true)
//     }
//   })
//   .catch(error => console.error(error))
// })
