document.querySelector('button').addEventListener('click', apiRequest)




async function apiRequest(){
    const plantName = document.querySelector('input').value
    try{
        const response = await fetch(`https://houseplant-api-demo.herokuapp.com/api/${plantName}`)
        const data = await response.json()
        console.log(data);

        document.getElementById('plantName').innerText = data.name
        document.getElementById('plantLight').innerText = data.light
        document.getElementById('plantRotate').innerText = data.rotate
        document.getElementById('plantWater').innerText = data.water
    } catch(error) {
        console.log(error);
    }
}