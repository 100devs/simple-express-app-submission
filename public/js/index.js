document.querySelector('#get-btn').addEventListener('click', getHeroes)
document.querySelector('#post-btn').addEventListener('click', addHero)
document.querySelector('#put-btn').addEventListener('click', updateHero)
document.querySelector('#delete-btn').addEventListener('click', deleteHero)

async function getHeroes() {
    document.querySelector('#heroes-list').innerHTML = ''
    const response = await fetch('/api')

    const data = await response.json()
    data.forEach(x => {
        const li = document.createElement('li')
        const divName = document.createElement('div')
        const divNickname = document.createElement('div')

        divName.innerText = 'name: ' + x.name
        divNickname.innerText = 'nickname: ' + x.nickname

        li.appendChild(divName)
        li.appendChild(divNickname)
        document.querySelector('#heroes-list').appendChild(li)
    })
}

async function addHero(e) {
    e.preventDefault()
    document.querySelector('#errorMessage').innerText = ''

    const newHero = {
        name: document.querySelector('#post-name').value || '',
        nickname: document.querySelector('#post-nickname').value || ''
    }

    if(newHero.name === '' || newHero.nickname === ''){
        document.querySelector('#errorMessage').innerText = 'Please fill out both the name and nickname fields'
        return
    }
    console.log(newHero)
    const response = await fetch(`/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newHero)
    })
    getHeroes()
}

async function updateHero(e) {
    e.preventDefault()
    document.querySelector('#errorMessage').innerText = ''

    const updatedHero = {
        name: document.querySelector('#put-name').value || '',
        nickname: document.querySelector('#put-nickname').value || ''
    }

    if(updatedHero.name === '' || updatedHero.nickname === ''){
        document.querySelector('#errorMessage').innerText = 'Please fill out both the name and nickname fields'
        return
    }

    const response = await fetch(`/api/${updatedHero.name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedHero)
    })
    getHeroes()
}

async function deleteHero(e) {
    e.preventDefault()

    document.querySelector('#errorMessage').innerText = ''

    if(document.querySelector('#delete-name').value === ''){
        document.querySelector('#errorMessage').innerText = 'Please fill out both the name and nickname fields'
        return
    }

    const response = await fetch(`/api/${document.querySelector('#delete-name').value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getHeroes()
}

getHeroes()