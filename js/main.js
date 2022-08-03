document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
  const pokeName = document.querySelector('input').value
  try {
    const response = await fetch(`https://simpley-pokemon-api.herokuapp.com/api/pokemon/${pokeName}`)
    const data = await response.json()
    console.log(data)
    document.querySelector('h2').innerText = data.name
    document.getElementById('pokePic').innerHTML = data.image
    document.getElementById('pokeCategory').innerText = ('Category: ' + data.category)
    document.getElementById('pokeType').innerText = ('Type: ' + data.type)
    document.getElementById('pokeHeight').innerText = ('Height: ' + data.height)
    document.getElementById('pokeWeight').innerText = ('Weight: ' + data.weight)
    document.getElementById('pokeAbility').innerText = data.ability
    document.getElementById('pokedexEntry').innerText = data.dexEntry
  } catch(error){
    console.log(error)
  }
}
