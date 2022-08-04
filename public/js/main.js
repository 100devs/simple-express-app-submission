const deleteText = document.querySelectorAll('.fa-trash')
const plusText = document.querySelectorAll('.fa-plus')
// const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCustomer)
})

Array.from(plusText).forEach((element)=>{
    element.addEventListener('click', addAmount)
})


// Array.from(thumbText).forEach((element)=>{
//     element.addEventListener('click', addLike)
// })



async function deleteCustomer(){
    const fName = this.parentNode.childNodes[1].innerText
    const lName = this.parentNode.childNodes[3].innerText
    const amount = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteCustomer', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'firstNameS': fName,
              'lastNameS': lName,
              'amountS': amount
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addAmount(){
    const fName = this.parentNode.childNodes[1].innerText
    const lName = this.parentNode.childNodes[3].innerText
    const amount = Number(this.parentNode.childNodes[5].innerText)
    const addAmount =  Number(this.parentNode.childNodes[7].value)
    // const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addAmount', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'firstNameS': fName,
              'lastNameS': lName,
              'amountS': amount,
              'addAmountS': addAmount
            //   'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// async function addLike(){
//     const fName = this.parentNode.childNodes[1].innerText
//     const lName = this.parentNode.childNodes[3].innerText
//     const amount = this.parentNode.childNodes[5].innerText
//     const tLikes = Number(this.parentNode.childNodes[5].innerText)
//     try{
//         const response = await fetch('addOneLike', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'firstNameS': fName,
//               'lastNameS' : lName,
//               'amountS': amount,
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