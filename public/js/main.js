const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.listedItems span.incomplete')
const itemStatus = document.querySelectorAll('.listedItems span.completed')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element) => {
    element.addEventListener('click', complete)
})

Array.from(itemStatus).forEach((element) => {
    element.addEventListener('click', incomplete)
})

async function deleteItem() {
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'itemFromUser': itemText})
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err) {
        console.log(err)
    }
}

async function complete() {
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('complete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'itemFromUser': itemText})
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err) {
        console.log(err)
    }
}

async function incomplete() {
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('incomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'itemFromUser': itemText})
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err) {
        console.log(err)
    }
}