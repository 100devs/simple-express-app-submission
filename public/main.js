const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteContact)
})

async function deleteContact(){
    const name = this.parentNode.childNodes[1].innerText
    const email = this.parentNode.childNodes[3].innerText
    const company = this.parentNode.childNodes[5].innerText
    const twitter = this.parentNode.childNodes[7].innerText
    const linkedin = this.parentNode.childNodes[9].innerText
    const spark = this.parentNode.childNodes[11].innerText
    try{
        const response = await fetch('deleteContact', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': name,
              'email': email,
              'company': company,
              'twitter': twitter,
              'linkedin': linkedin,
              'spark': spark,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
