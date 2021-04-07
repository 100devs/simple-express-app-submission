alert('Working')

document.querySelector('button').addEventListener('click', getHeroName)

async function getHeroName(){
  const heroName = document.querySelector('input').value
  try{
    const res = await fetch(`https://hero-api-100devs.herokuapp.com/api/heroes/${heroName}`)
    const data = await res.json()
    console.log(data)
    document.querySelector('h2').innerText = data.name
  }catch(err){
    console.log(err)
  }

}
