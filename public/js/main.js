const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
// const downThumbText = document.querySelectorAll('.fa-thumbs-down')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteSong)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

// Array.from(thumbText).forEach((element)=>{
//     element.addEventListener('click', addDislike)
// })

async function deleteSong(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteSong', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'songNameS': sName,
              'bandNameS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'songNameS': sName,
              'bandNameS': bName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// async function addDislike(){
//     const sName = this.parentNode.childNodes[1].innerText
//     const bName = this.parentNode.childNodes[3].innerText
//     const tLikes = Number(this.parentNode.childNodes[5].innerText)
//     try{
//         const response = await fetch('addOneDislike', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'songNameS': sName,
//               'bandNameS': bName,
//               'likesS': tLikes
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }