document.querySelector('.btn-20').addEventListener('click', apiRequest)


async function apiRequest(){
    const clubName = document.querySelector('input').value 

    try{
        const response = await fetch(`https://football-stadium-api.herokuapp.com/api/${clubName}`)
        const data = await response.json()
        console.log(data)
        if(data.image === 'unknown'){
            document.getElementById('error').classList.toggle('hidden')
        }else{
        document.getElementById('info').classList.toggle('hidden')
        document.getElementById('clubName').innerText = data.clubName
        document.getElementById('stadiumName').innerText = data.stadiumName
        document.getElementById('capacity').innerText = data.stadiumCapacity
        document.getElementById('yearBuilt').innerText = data.stadiumBuilt
        document.getElementById('stadiumImage').src = data.image
        document.getElementById('logoImage').src = data.logoImage
        }
    } catch(error) {
        console.log(error)
    }
}
