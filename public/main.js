document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const scale = document.querySelector('input').value
    try{
        const response = await fetch(`https://major-music-scales-api.herokuapp.com/api/${scale}`)
        const data = await response.json()
        console.log(data)

        document.getElementById('notes').innerText = data.notes
    }
    catch(error){
        console.log(error)
    }
}