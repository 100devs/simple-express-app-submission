const deleteText = document.querySelectorAll('.fa-trash')
 const findOneAndUpdateText = document.querySelectorAll('.fa-refresh')


Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteContact)
})

 Array.from(updateText).forEach((element)=>{
     element.addEventListener('click', updateContact)
 })

async function deleteContact(){
    const id = this.parentNode.childNodes[1].innerText
    const name = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'devId: id',
              'devName':name,
              'devEmail':email,
              'devPhone':phone,
              'devCity':city,
              'devdesignation':designation,
              'devCompany': company,
              'devTwitter': twitter,
              'devLinkedin': linkedin,
              'devNotes': notes,

            })
          })
        const data = await response.json()
        console.log(data)
        window.location.reload(true)

    }catch(err){
        console.log(err)
    }
}

async function updateContact(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('/addNew/:name', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'devId: id',
              'devName':name,
              'devEmail':email,
              'devPhone':phone,
              'devCity':city,
              'devdesignation':designation,
              'devCompany': company,
              'devTwitter': twitter,
              'devLinkedin': linkedin,
              'devNotes': notes,
            })
          })
        const data = await response.json()
        console.log(data)

        window.location.reload(true)

    }catch(err){
        console.log(err)
    }
}
