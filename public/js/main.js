const deleteText = document.querySelectorAll('.fa-trash')
const followUp = document.querySelectorAll('.fa-phone')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteClient)
})

Array.from(followUp).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteClient(){
    const cName = this.closest("tr").children[0].innerText
    const cEmail = this.closest("tr").children[1]
    const cPhone = this.closest("tr").children[2]
    const cDate = this.closest("tr").children[3]
    const cNotes = this.closest("tr").children[4]
    try {
        const response = await fetch('deleteClient', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'clientNameS': cName,
              'clientEmailS': cEmail,
              'clientPhoneS': cPhone,
              'dateS': cDate,
              'clientNotesS': cNotes,
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
    const cName = this.closest('tr').children[0].innerText
    const cEmail = this.closest('tr').children[1].innerText
    const cPhone = this.closest('tr').children[2].innerText
    const cDate = this.closest('tr').children[3].innerText
    const cNotes = this.closest('tr').children[4].innerText
    const tLikes = this.closest('tr').children[5].innerText

    console.log(cName, tLikes)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'clientNameS': cName,
                'clientEmailS': cEmail,
                'clientPhoneS': cPhone,
                'dateS': cDate,
                'clientNotesS': cNotes,
                'likesS': Number(tLikes)
            })
          })
        const data = await response.json()
        console.log('Follow up recorded')
        location.reload()

    }catch(err){
        console.log(err)
    }
}