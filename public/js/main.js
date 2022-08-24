const editButton = document.querySelectorAll('.editButton')
const deleteButton = document.querySelectorAll('.deleteButton')

Array.from(editButton).forEach((element)=>{
    element.addEventListener('click', editEntry)
})

Array.from(deleteButton).forEach((element)=>{
    element.addEventListener('click', deleteEntry)
})

async function deleteEntry(){
    const date = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'date': date
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}