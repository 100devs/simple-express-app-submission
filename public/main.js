document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function updateEntry(){
    try{
        const res = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName("name")[0].value,
                speciesName: document.getElementsByName("speciesName")[0].value,
                features: document.getElementsByName("features")[0].value,
                homeworld: document.getElementsByName("homeworld")[0].value,
                image: document.getElementsByName("image")[0].value,
                interestingFact: document.getElementsByName("interestingfacts")[0].value,
                notableExamples: document.getElementsByName("notableexamples")[0].value,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err) {
        console.log(err)
    }
}

async function deleteEntry(){
    const input = document.getElementById("deleteInput")
    console.log(input.value)
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err){
            console.log(err)
        
        }
}