document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function updateEntry() {
    try {
        const res = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                itemName: document.getElementsByName('itemName')[0].value,
                price: document.getElementsByName('price')[0].value
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function deleteEntry() {
    const input = document.getElementById('deleteInput')
    try {
        const res = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                itemName: input.value
            })
        })
        const data = await res.json()
        location.reload()
    } catch (err) {
        console.log(err)
    }
}