// const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const deleteName = document.querySelector('#delete-name')
const messageDiv = document.querySelector('#message')

// update.addEventListener('click', _ => {
//     fetch('/api/persons', {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Darth Vadar',
//             homeNumber: 'I find your lack of faith disturbing.'
//         })
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//     })
//     .then(response => {
//         // console.log(response)
//         window.location.reload(true)
//     })
// })

deleteButton.addEventListener('click', _ => {
    fetch('/', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: deleteName.value
        })
    })
    .then(res => {
        // console.log(res)
        if (!res.ok) {
            messageDiv.textContent = 'Name not found'
        } else {
            window.location.reload(true)
        }
    })
})