const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-plus')
const minusOne = document.querySelectorAll('.fa-minus')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(minusOne).forEach((element)=>{
    element.addEventListener('click', minOne)
})


async function deleteRapper(){
    const fName = this.parentNode.childNodes[1].innerText
    const eDate = this.parentNode.childNodes[3].innerText
    const fType = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'foodNameS': fName,
              'entryDateS': eDate,
              'foodTypeS': fType
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
    // child nodes arnt html are the doms elements and even a space is a node which is why nodes[1] is the second child but is are html element 
    const fName = this.parentNode.childNodes[1].innerText
    const eDate = this.parentNode.childNodes[3].innerText
    const fType = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'foodNameS': fName,
              'entryDateS': eDate,
              'foodTypeS': fType,
                'likesS': tLikes        //this is the number of likes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function minOne(){
    // child nodes arnt html are the doms elements and even a space is a node which is why nodes[1] is the second child but is are html element 
    const fName = this.parentNode.childNodes[1].innerText
    const eDate = this.parentNode.childNodes[3].innerText
    const fType = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('minusOne', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'foodNameS': fName,
              'entryDateS': eDate,
              'foodTypeS': fType,
                'likesS': tLikes        //this is the number of likes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}