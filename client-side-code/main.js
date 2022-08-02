document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const bandName = document.querySelector('input').value
    try{
        const response = await fetch(` https://poppunk-bands-api.herokuapp.com/api/${bandName}`)
        const data = await response.json()

        console.log(data)
        document.querySelector('h2').innerText = data.origin
    }catch(error){
        console.log(error)
    }
}