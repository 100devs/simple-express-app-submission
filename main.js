alert('working')
document.querySelector('button').addEventListener('click', getHeroAbility)

async function getHeroAbility(){
    const heroName = document.querySelector('input').value
    try{
    const res = await fetch(`https://marvel-api-100devs.herokuapp.com/api/avengers/${heroName}`)
    const data = await res.json() // that await is needed or else that promise will just be pending

        console.log(data)
        document.querySelector('h2').innerText = data.Abilities
    }catch(err){
        console.log(err)
    }
    
}