const delButton = document.querySelectorAll('.fa-dumpster-fire')
delButton.forEach(x => x.addEventListener('click', deleteIt))

async function deleteIt() {
    console.log('click')
    const sName = this.parentNode.childNodes[1].innerText
    const sCountry = this.parentNode.childNodes[3].innerText
    console.log(sName, sCountry)
    try {
        const response = await fetch('deleteName', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'nameS': sName,
                'countryS': sCountry
            })
        })
        const data = await response.json()
        console.log(data)
        // location.reload()
    } catch(err) {
        console.log(err)
    }
}