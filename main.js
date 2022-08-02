document.querySelector('button').addEventListener('click', getCharacter)
document.querySelector('.random').addEventListener('click', getRandomCharacter)

async function getCharacter() {

    const characterInput = document.querySelector('input').value
    const res = await fetch(`/api/${characterInput}`)
    const character = await res.json()

    console.log(character.imgURL)

    if(character == 'uknown'){
        document.querySelector('.name').innerHTML = "Uknown Character"
        document.querySelector('main').classList.add('hidden')

        return
    }

    document.querySelector('.name').innerHTML = character.name
    document.querySelector('.type').innerHTML = character.description

    document.querySelector('img').src = character.imgURL

    document.querySelector('.passive').textContent = character.skills.passive.name
    document.querySelector('.pDes').textContent = character.skills.passive.description

    document.querySelector('.tactical').innerHTML = character.skills.tactical.name
    document.querySelector('.tDes').textContent = character.skills.tactical.description

    document.querySelector('.ultimate').innerHTML = character.skills.ultimate.name
    document.querySelector('.uDes').textContent = character.skills.ultimate.description

    document.querySelector('main').classList.remove('hidden')
}

async function getRandomCharacter(){
    const res = await fetch(`/random`)
    const character = await res.json()

    console.log(character.constructor.name)

    document.querySelector('.name').innerHTML = character.name
    document.querySelector('.type').innerHTML = character.description

    document.querySelector('img').src = character.imgURL

    document.querySelector('.passive').textContent = character.skills.passive.name
    document.querySelector('.pDes').textContent = character.skills.passive.description

    document.querySelector('.tactical').innerHTML = character.skills.tactical.name
    document.querySelector('.tDes').textContent = character.skills.tactical.description

    document.querySelector('.ultimate').innerHTML = character.skills.ultimate.name
    document.querySelector('.uDes').textContent = character.skills.ultimate.description

    document.querySelector('main').classList.remove('hidden')
}