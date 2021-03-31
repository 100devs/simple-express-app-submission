console.log('Accessing main.js')

const deleteItem = document.querySelectorAll('.del')

Array.from(deleteItem).forEach(el => {
    el.addEventListener('click', removeItem)
})

async function removeItem(){
    const name = this.parentNode.childNodes[1].innerText
    const number = this.parentNode.childNodes[3].innerText
    console.log('removing item: '+ name + number)
    try{
        const response = await fetch('removeItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "nameS": name,
                "numberS": number
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}
