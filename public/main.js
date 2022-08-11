const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const messageDiv = document.querySelector('#message');

// creates an array of trash icon elements and adds an eventListener function to each
Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteSecret)
})

Array.from(thumbText).forEach((element) => {
    element.addEventListener('click', addLike)
})

// function to delete a secret; runs on the above click eventListener on trash icons
async function deleteSecret() {
    const location = this.parentNode.childNodes[1].innerText
    const secret = this.parentNode.childNodes[3].innerText
    try {
        const response = await fetch('deleteSecret', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'location': location,
                'secret': secret
            })
        })
        const data = await response.json()
        console.log(data)
        window.location.reload(true)
    }
    catch(err) {
        console.log(err)
    }
}

async function addLike() {
    const location = this.parentNode.childNodes[1].innerText
    const secret = this.parentNode.childNodes[3].innerText
    const likes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const response = await fetch('addONeLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'location': location,
                'secret': secret,
                'likes': likes
            })
        })
        const data = await response.json()
        console.log(data)
        window.location.reload(true)
    }
    catch(err) {
        console.log(err)
    }
}



// update.addEventListener('click', _ => {
//     fetch('/submit', {
//         method: 'put',
//         headers: {'Content-Type': "application/json"},
//         body: JSON.stringify({
//             name: "111-111-111",
//             location: "artifact",
//             secret: "cloak of shadows"
//         })
//     })
//     .then(res => {
//         if(res.ok) return res.json()
//     })
//     .then(response => {
//         window.location.reload(true)  // this reloads the page instantly after clicking button
//     })
// })

// deleteButton.addEventListener('click', _ => {
//     fetch('/submit', {
//         method: 'delete',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: '111-111-111'
//         })
//     })
//     .then(res => {
//         if(res.ok) return res.json()
//     })
//     .then(response => {
//         if(response === "no secret to delete") {
//             messageDiv.textContent = "no secret to delete"
//         }
//         window.location.reload(true)  // this reloads the page instantly after clicking button
//     })
// })