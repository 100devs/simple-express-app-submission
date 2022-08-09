document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function deleteEntry(){
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fullName: input.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch(error){
        console.log(error)
    }
}

async function updateEntry() {
    try{
        const response = await fetch('/updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: document.getElementsByName('firstName')[0].value, 
                lastName: document.getElementsByName('lastName')[0].value,
                image: document.getElementsByName('image')[0].value,
                jerseyNumber: document.getElementsByName('jerseyNumber')[0].value,
                position: document.getElementsByName('position')[0].value,
                bats: document.getElementsByName('bats')[0].value,
                throws: document.getElementsByName('throws')[0].value,
                age: document.getElementsByName('age')[0].value,
                nickname: document.getElementsByName('nickname')[0].value,
                fullName: document.getElementsByName('fullName')[0].value,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}