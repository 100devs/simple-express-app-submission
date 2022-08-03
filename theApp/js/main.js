document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest() {
    const trickName = document.querySelector('input').value.replaceAll(' ','').replaceAll('-','').replaceAll("'", "").toLowerCase()

    console.log(trickName)

    try {
        const res = await fetch(`https://the-skate-api.herokuapp.com/api/${trickName}`)
        const data = await res.json()
        console.log(data)
        changeContent(data)
    } catch(error) {
        console.log(error)
    }
}

const trickName = document.querySelector('#trickNameDisplay')
const trickImage = document.querySelector('#trickImageDisplay')
const skillLevel = document.querySelector('#skillLevelDisplay')
const inventor = document.querySelector('#inventorDisplay')
const yearCreated = document.querySelector('#yearCreated')
const description = document.querySelector('#descriptionDisplay')

function changeContent(data) {
    trickName.innerText = data.name
    skillLevel.innerText = data.skillLevel
    inventor.textContent = data.inventor
    yearCreated.textContent = data.yearCreated
    description.textContent = data.description
    // trickImage.src = ""
}