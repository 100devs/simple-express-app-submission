const deleteButton = document.querySelector("#delete-button")
const messageDiv = document.querySelector('#message')
const thumbText = document.querySelectorAll('#likeButton')
const deletePosts = document.querySelectorAll('#deletePost')
const post = document.querySelectorAll('#eachPost')

// console.log(post)

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(deletePosts).forEach((element)=>{
    element.addEventListener('click', deletePost)
})

// deleteButton.addEventListener('click', _ => {
//     fetch('/blogPost', {
//         method: 'delete',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             name: ''
//         })
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//     })
//     .then(data => {
//         if (data === 'No blank posts at this time') {
//             messageDiv.textContent = 'No blank posts to delete'
//         } else {
//             window.location.reload()  
//         }
//     })
// })

async function deletePost(){
    const itemID = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deletePost', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'ObjectId': `${itemID}`
            })
          })
        const data = await response.json()
        // console.log(itemID)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
async function addLike(){
    const itemID = this.parentNode.childNodes[1].innerText
    // const sName = this.parentNode.childNodes[3].innerText
    // const bMessage = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[11].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'ObjectId': itemID,
                'likesS': tLikes
            })
          })
        const data = await response.json()
        // console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

