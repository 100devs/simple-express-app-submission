//get band/song on index.ejs
/*
document.querySelector("button").addEventListener("click", getBestSong)

async function getBestSong(){
    const bandName = document.querySelector("input").value
    try{
        const res = await fetch(`https://emo-band-songs-api.herokuapp.com/api/${bandName}`)
        const data = await res.json()

        console.log(data)
        document.querySelector("h2").innerText = data.song
    }catch(error){
        console.log(error)
    }
}*/

document.querySelector("form").addEventListener("submit", getBestSong)

async function getBestSong(){
    const bandName = document.querySelector("input").value
    try{
        const res = await fetch(`https://localhost:8000/api/${bandName}`)
        const data = await res.json()

        console.log("form submitted")
        document.querySelector("h2").innerText = data.song
    }catch(error){
        console.log(error)
    }
}