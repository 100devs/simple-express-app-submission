const deleteItems = document.querySelectorAll('.del')
console.log(deleteItems)

Array.from(deleteItems).forEach((element) => {
    console.log('events created')
    element.addEventListener('click', deleteTeam)
})

async function deleteTeam() {
    console.log("been clicked")
    const tName = this.parentNode.childNodes[1].innerText.trim()
    const rings = this.parentNode.childNodes[3].innerText
    console.log(tName)
    try {
        // const response = await fetch('deleteTeam', {
        //     method: 'delete',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         'teamName': tName,
        //         'numRings': rings
        //     })
        // })
        const response = await fetch('deleteTeam', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'teamName': tName,
                'numRings': rings
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch (err) {
        console.error(err)
    }
}