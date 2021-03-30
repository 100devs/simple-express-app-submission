const deleteItem = document.querySelectorAll('.del')

Array.from(deleteItem).forEach(item => {
    item.addEventListener('click', deleteListItem)
})

async function deleteListItem(){
    const choreItem = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todoX': choreItem
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}