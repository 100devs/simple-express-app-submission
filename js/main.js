document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const parkName = document.querySelector('input').value
    try{
        const res = await fetch(`https://nationalparks-api-tapper.herokuapp.com/api/${parkName}`)
        const data = await res.json()

        document.querySelector('h2').innerText = data.location
    }catch(err){
        console.log(err)
    }
}