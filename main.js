
document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const bandName = document.querySelector('input').value

    try{
        const response = await fetch(`https://band-members-api.herokuapp.com/api/${bandName}`)
        const data = await response.json()
        console.log(data);

        document.getElementById('bandName').innerText = data.nameOfBand
        document.getElementById('leader').innerText = data.leader
        document.getElementById('otherMembers').innerText = data.otherMembers
        document.getElementById('bandImage').src = data.image

        document.getElementById('infoBox').classList.remove('hidden')

    } catch(error) {
        console.log(error)
    }
}