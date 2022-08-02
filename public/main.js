document.getElementById('updateButton').addEventListener('click',updateEntry)
document.getElementById('deleteButton').addEventListener('click',deleteEntry)


async function updateEntry(){
    try{
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                discName: document.getElementsByName('discName')[0].value,
                speedInfo: document.getElementsByName('speedInfo')[0].value,
                glideInfo: document.getElementsByName('glideInfo')[0].value,
                turnInfo: document.getElementsByName('turnInfo')[0].value,
                fadeInfo: document.getElementsByName('fadeInfo')[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err) {
        console.log(err)
    }
}

async function deleteEntry(){
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('/deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                discName: input.value
            })
        })
        const data = await response.json()
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}