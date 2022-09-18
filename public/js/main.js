let trashcans = document.querySelectorAll('.fa-trash')
let hards = document.querySelectorAll('.fa-solid.fa-flag')
let easies = document.querySelectorAll('.fa-regular')
let speakers = document.querySelectorAll('.fa-volume-high')

Array.from(trashcans).forEach(x => x.addEventListener('click', removeWord))
Array.from(hards).forEach(x => x.addEventListener('click', changeToEasy))
Array.from(easies).forEach(x => x.addEventListener('click', changeToHard))
Array.from(speakers).forEach(x => x.addEventListener('click', readWord))
console.log(easies)
console.log(hards)

async function removeWord() {
    const word = this.parentNode.dataset.id

    try {
        let res = await fetch('word/removeOne', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'removal': word
            })
        })
        let data = await res.json()
        location.reload()
    } catch(err) {
        console.error(err)
    }
}

async function changeToHard() {
    const word = this.parentNode.dataset.id

    try {
        let res = await fetch('word/setHard', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'change': word
            })
        })
        let data = await res.json()
        location.reload()
    } catch(err) {
        console.error(err)
    }
}

async function changeToEasy() {
    const word = this.parentNode.dataset.id

    try {
        let res = await fetch('word/setEasy', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'change': word
            })
        })
        let data = await res.json()
        location.reload()
    } catch(err) {
        console.error(err)
    }
}

function readWord() {
    const synth = window.speechSynthesis;
    const word = this.parentNode.childNodes[7].innerText
    const definition = this.parentNode.childNodes[9].innerText

    const say = `${word} ${definition}`
    let sayThis = new SpeechSynthesisUtterance(say)

    synth.speak(sayThis)
}
