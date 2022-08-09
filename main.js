document.querySelector('button').addEventListener('click',apiRequest)

async function apiRequest(){
    const fighterName = document.querySelector('input').value
    try{
        const response = await fetch(`https://smash-64-100devs.herokuapp.com/api/${fighterName}`)
        const data = await response.json()
        console.log(data)

        document.getElementById('fighterName').innerText = data.fighterName
        document.getElementById('fighterSpecial').innerText = data.special
        document.getElementById('fighterUpSpecial').innerText = data.upspecial
        document.getElementById('fighterDownSpecial').innerText = data.downspecial
        document.getElementById('fighterImage').src = data.image
    } catch(error) {
        console.log(error)
    }
}