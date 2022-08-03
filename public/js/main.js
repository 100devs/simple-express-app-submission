// -----------------------------------
// Measure length of team
// -----------------------------------

const quantityColour = () => pokeList.length < 6 ? teamQuantity.style.color = 'green' : teamQuantity.style.color = 'red'

window.onload = function() {
    checkLength()
    quantityColour()
}

const pokeList = document.querySelectorAll(".current_team li")
const updateQuantity = () => teamQuantity.innerText = `(${pokeList.length < 6 ? pokeList.length : 6} of 6)`
const teamQuantity = document.querySelector('#teamQuantity')
const submitForm = document.querySelector('#submit').addEventListener('click', checkLength, quantityColour)

function checkLength() {
    document.querySelectorAll(".current_team li")
    if (pokeList.length >= 6) {
        document.querySelector('#submit').disabled = true
        updateQuantity()
    } else {
        document.querySelector('#submit').disabled = false
        updateQuantity()
    }
}

// -----------------------------------
// Delete and Favourite Buttons
// -----------------------------------

const deleteRow = document.querySelectorAll('.fa-trash-can')
const addToFavourites = document.querySelectorAll('.fa-star')

Array.from(deleteRow).forEach(x => {
    x.addEventListener('click', deletePokemon)
})

Array.from(addToFavourites).forEach(x => {
    x.addEventListener('click', setFave)
})

function setFave() {
    let pFave = this.parentNode.childNodes[11].innerText
    const pName = this.parentNode.childNodes[3].innerText.replace(/[()]/g, "")
    const pLevel = this.parentNode.childNodes[5].innerText.replace(/\D/g, "")
    const pAbility = this.parentNode.childNodes[14].innerText
    console.log(pFave)
    fetch('/fave', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': pName,
                'level': pLevel,
                'ability': pAbility, 
                'favourite': pFave
            })
        })
        .then(res => {
            res.json("Favourited")
        })
        .then(data => {


        })
        location.reload()
        .catch(error => console.log(error))
}


function deletePokemon() {
    const pName = this.parentNode.childNodes[3].innerText.replace(/[()]/g, "")
    const pLevel = this.parentNode.childNodes[5].innerText.replace(/\D/g, "")
    const pAbility = this.parentNode.childNodes[14].innerText
    fetch('/deletePoke', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': pName,
                'level': pLevel,
                'ability': pAbility
            })
        })
        .then(res => {
            res.json("Pokémon deleted")
        })
        .then(data => {
            location.reload()
        })
        .catch(error => console.log(error))
}

// -----------------------------------
// PokéAPI fetch and DOM data fill
// -----------------------------------

let activeSpecies = ""
let searchQuery = document.querySelector('.search input')

function findSpecies() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${activeSpecies}`)
        .then(res => res.json())
        .then (data => {
            console.log(data)
            clearDropdown(document.getElementById('abilityField'))
            clearDropdown(document.getElementById('moveFieldA'))
            clearDropdown(document.getElementById('moveFieldB'))
            clearDropdown(document.getElementById('moveFieldC'))
            clearDropdown(document.getElementById('moveFieldD'))

            document.querySelector('#pokeNameField').value = data.name.charAt(0).toUpperCase() + data.name.slice(1,data.name.length)
        
            for (let i = 0; i < data.abilities.length; i++){
                let opt = document.createElement('option')
                opt.value = data.abilities[i].ability.name.replace(/[-]/g," ").replace(/\b\w/g, x => x.toUpperCase())
                opt.innerHTML = data.abilities[i].ability.name.replace(/[-]/g," ").replace(/\b\w/g, x => x.toUpperCase())
                opt.classList = "ability-dropdown"
                document.querySelector('#abilityField').appendChild(opt)
            }

            document.querySelector("#previewSprite").src = `https://img.pokemondb.net/sprites/home/normal/${data.name}.png` 
            document.querySelector("#previewSprite").alt = `"${data.name}" Pokémon Sprite` 
            document.querySelector("#spriteData").value = `https://img.pokemondb.net/sprites/home/normal/${data.name}.png`
            document.querySelector("#shinyCheck").addEventListener('change', (e) => {
                if (e.target.checked) {
                    document.querySelector("#spriteData").value = `https://img.pokemondb.net/sprites/home/shiny/${data.name}.png`
                    document.querySelector("#previewSprite").src = `https://img.pokemondb.net/sprites/home/shiny/${data.name}.png` 
                } else {
                    document.querySelector("#spriteData").value = `https://img.pokemondb.net/sprites/home/normal/${data.name}.png`
                    document.querySelector("#previewSprite").src = `https://img.pokemondb.net/sprites/home/normal/${data.name}.png` 
                }
            })

            for (let i = 0; i < data.moves.length; i++){
                let opt = document.createElement('option')
                opt.value = data.moves[i].move.name.replace(/[-]/g," ").replace(/\b\w/g, x => x.toUpperCase())
                opt.innerHTML = data.moves[i].move.name.replace(/[-]/g," ").replace(/\b\w/g, x => x.toUpperCase())
                opt.classList = "move-dropdown"
                let newOptB = opt.cloneNode(true)
                let newOptC = newOptB.cloneNode(true)
                let newOptD = newOptC.cloneNode(true)
                document.querySelector('#moveFieldA').appendChild(opt)
                document.querySelector('#moveFieldB').options.add(newOptB)
                document.querySelector('#moveFieldC').options.add(newOptC)
                document.querySelector('#moveFieldD').options.add(newOptD)
            }

            Array.from(document.querySelectorAll('.randombutton')).forEach(x => x.addEventListener('click', function() { 
                const dropdown = document.getElementById(this.parentNode.childNodes[1].id)
                const opt = dropdown.children
                dropdown.value = opt[Math.floor(Math.random() * data.moves.length)].value    
            }))
        })
        // .catch(err => {console.log(`error ${err}`)})
}

// -----------------------------------
// Search Bar
// -----------------------------------
document.querySelector('#search').addEventListener('click', () => {
  activeSpecies = searchQuery.value.toLowerCase()
  findSpecies()
})

// -----------------------------------
// Activate search upon pressing Enter key
// -----------------------------------
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search").click();
  }
})

// -----------------------------------
// Clear values from Dropdown Box
// -----------------------------------  
function clearDropdown(opt) {
    let length = opt.options.length -1
    for(let i = length; i >= 0; i--) {
        opt.remove(i)
    }
}

// -----------------------------------
// Pokémon Info Accordion
// -----------------------------------  
let fieldState = false
const hideField = document.querySelector('#hideField')
hideField.addEventListener('click', () => {
    if (fieldState === false) {
        document.querySelector('.gridcontainer').style.display = "none"
        hideField.innerText = "Show"
        fieldState = true
    } else if (fieldState === true) {
        document.querySelector('.gridcontainer').style.display = "grid"
        hideField.innerText = "Hide"
        fieldState = false
    }
})

