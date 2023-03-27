// Make all entries click to edit on DOM load

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.entry').forEach(e => e.addEventListener('click', event => {
        let target = event.target.classList.contains('entry') ? event.target : event.target.parentElement.classList.contains('entry') ? event.target.parentElement : event.target.parentElement.parentElement
        editThis(target)
    }))
 }, false);

// This opens the editing form and populates it with the database info for the relevant entry

 async function editThis(element) {
    document.querySelector('#warning').classList.add('hidden')
    const entryID = element.id
    const data = await fetch(`ID_${entryID}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    let json = await data.json()
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelectorAll('.entry').forEach(e => e.classList.add('hidden'))
    document.querySelector('#prizes').classList.remove('hidden')
    document.querySelector('#forID').innerText = `Number: ${json.id}`
    document.querySelector('#secretIdBox').value = json.id
    document.querySelector('#name').innerText = json.fullName
    document.querySelector('#numOfModels').innerText = json.numOfModels
    document.querySelector('#inComp').innerText = json.inCompetition ? "In competition" : "Not in competition"
    document.querySelector('#age').innerText = json.junior ? "Junior" : "Adult"
    document.querySelector('#age').classList.add(json.junior ? "junior" : "adult")
    if (json.judged == "N/A") {
        document.querySelector('#isJudged').classList.add('hidden')
        document.querySelector('#notForJudging').checked = true
        document.querySelector('#forMedals').classList.add('hidden')
        document.querySelector('#bestOfShow').classList.add('hidden')
        document.querySelector('#forBestOfShow').classList.add('hidden')
        document.querySelector('#junBestOfShow').classList.add('hidden')
        document.querySelector('#forJunBestOfShow').classList.add('hidden')
    }
    else if (json.judged) {
        document.querySelector('#yesJudged').checked = true
        document.querySelector('#notJudged').checked = false
    } else if (!json.judged) {
        document.querySelector('#yesJudged').checked = false
        document.querySelector('#notJudged').checked = true
    } 

    if (json.prizes && json.prizes.medal) {
        let medal = json.prizes.medal
        if (medal == "bronze") {
            document.querySelector('#bronze').checked = true
            document.querySelector('#silver').checked = false
            document.querySelector('#gold').checked = false
        } else if (medal == "silver") {
            document.querySelector('#silver').checked = true
            document.querySelector('#bronze').checked = false
            document.querySelector('#gold').checked = false
        } else {
            document.querySelector('#gold').checked = true
            document.querySelector('#silver').checked = false
            document.querySelector('#bronze').checked = false
        }
    }
    [document.querySelector('#bestOfShow'), document.querySelector('#junBestOfShow'), document.querySelector('#corrr'), document.querySelector('#peoplesChoice')].forEach(e => {
        if (json.prizes && json.prizes[e.id]) {
            e.checked = true
        }
    })
    if (json.prizes && json.prizes.sponsors) {
        document.querySelector('#sponsors').value = typeof(json.prizes.sponsors) == "string" ? json.prizes.sponsors : json.prizes.sponsors.join(',')
    }
    if (json.junior) {
        document.querySelectorAll('.adultsOnly').forEach(e => e.classList.add('hidden'))
    } else {
        document.querySelectorAll('.kidsOnly').forEach(e => e.classList.add('hidden'))
    }
}

// To make medals checkboxes where only one can be selected (as radio doesn't allow for unselecting)

function onlyOne(checkbox) {
    const checkboxes = document.getElementsByName('medals')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

// To ensure People's Choice, Best of Show and Junior Best of Show can only be awarded once

async function checkIfTaken(checkbox, prize) {
    let taken = await fetch(`checkFor_${prize}`)
    taken = await taken.json()
    console.log(taken)
    let prettyfied = {junBestOfShow: "Junior Best of Show", bestOfShow: "Best of Show", peoplesChoice: "People's Choice"}
    if (taken.length && taken[0].id !== Number(document.querySelector('#secretIdBox').value)) {
        checkbox.checked = false
        document.querySelector('#warning').innerHTML = `${prettyfied[prize]} has already been assigned to Number ${taken[0].id}, ${taken[0].fullName}!`
        document.querySelector(`[id="${taken[0].id}"]`).classList.remove('hidden')
        document.querySelectorAll('.entry').forEach(e => {
            if (e.id !== String(taken[0].id)) {
                e.classList.add('hidden') // Make the irrelevant one go away if switching between prizes that are already taken
            }
        })
        document.querySelector('#warning').classList.remove('hidden')
    }
}