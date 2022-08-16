const deleteBtn = document.querySelectorAll('.deleteBtn')

Array.from(deleteBtn).forEach(el => {
    el.addEventListener('click', deleteButton)
})

async function deleteButton() {
    try {
        let itemId = this.parentNode.childNodes[1].href
        itemId = itemId.split('/edit/')[1]
        console.log(itemId)
        const response = await fetch(`deleteNote/${itemId}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemId': itemId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}