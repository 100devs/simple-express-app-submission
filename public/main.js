/* Tasks:
Done or done-ish:
- Add default listing of all elements on page (done)
- Add "edit entry" button (done)
- Change add entry functionality so multiple people can't create an entry with the same id at the same time (done)
- Add CSS for judging page to colour differentiate not in competition / judged/ not judged (done)
- Add functionality to check for entries with empty name so that IDs don't get incremented if someone clicks "add entry" and then goes to do something else (done)
- Only prizes available for not in comp are People's Choice and Sponsor prizes (done)
- Now split up across 3 pages - all entries should always be clickable on judging page, with prizes available (done)
- Fix Not In Competition - judging form currently reverts judged back to false. Ideally don't have a judged flag at all, or at least need a value other than "false". (done)
- Add functionality to filter by prizes (done, with human-readable output)
- BIG ISSUE: Editing entry on the Registration page removes the name and # of models. FIX THIS. - Fixed - caused by an obsolete reference to the prizes section
- Get rid of "edit this entry" button and make reg entries editable like in judging view if "edit entry" is clicked - done
- Add People's Choice to filter page - done
- Add "no medal" option - presumably not everyone gets a medal - done, bronze/silver/gold are now checkboxes that do not allow multiple selections
- Ensure Junior and Adult categories are either/or and don't both show up in judging and it's clearly visible whether it's a junior - done
- Add values validation (no negative number of models etc.) - done, name & num of models are required & num of models is min 1
- Add visual indicator what category is currently being looked at on filter results and for "edit mode" on registration page - done
- Add validation/error warning that Best in Show, Junior Best in Show and People's Choice can only be awarded once - done, now also brings up entry that has already been awarded that prize
- Separate juniors from the others in the prizes filter - done!
- Add CSS to make it look not horrible - would call this mostly done!
- Fix entries layout in filters view, broken by CSS changes - done, was caused by vertical centering
- Get rid of double border between entries - done. I still hate CSS.
- Not in competition is eligible for CORRR after all - done.
- Add Statistics to the filters - # of participants (adult/junior), # of models total - done

To do:
*/

// Hack to highlight which category is being filtered by on the Filters page

const filterButtons = document.querySelectorAll('.filterbutton')

document.addEventListener('DOMContentLoaded', function() {
    filterButtons.forEach(e => {
        if (window.location.href.includes(e.id)) {
            e.classList.add('active')
        }
    }) 
 }, false);

// Other buttons

const addButton = document.querySelector('#addButton')
const editButton = document.querySelector('#editEntries')

if (addButton) {addButton.addEventListener('click', openAddForm)}
if (editButton) {editButton.addEventListener('click', editEntries)}

// Highlight edit button when entries are clickable
if (editButton) {editButton.addEventListener('click', () => editButton.classList.add('active'))}


// Function that retrieves the next ID number when "add entry" is clicked and populates the form with it

async function openAddForm() {
    document.querySelectorAll('.entry').forEach(e => e.removeEventListener('click', event => editThis(event.target.parentElement)))
    editButton.classList.remove('active')
    document.querySelector('.buttonsGoHere').classList.add('hidden')
    const res = await fetch('/postEntry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    let id = await res.text()
    id = Number(id)

    document.querySelector('#forID').innerText = `Number: ${id}`
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelector('#secretIdBox').value = id
}

// Function for making entries editable in Registration view

function editEntries() {
    document.querySelectorAll('.entry').forEach(e => e.addEventListener('click', event => {
        let target = event.target.classList.contains('entry') ? event.target : event.target.parentElement.classList.contains('entry') ? event.target.parentElement : event.target.parentElement.parentElement
        editThis(target)
    }))
}
 

// Function for editing an entry on the Registration page

async function editThis(element) {
    editButton.classList.remove('active')
    document.querySelector('.buttonsGoHere').classList.add('hidden')
    const entryID = element.id
    const data = await fetch(`ID_${entryID}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    let json = await data.json()
    console.log(json)
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelectorAll('.entry').forEach(e => e.classList.add('hidden'))
    document.querySelector('#forID').innerText = `Number: ${json.id}`
    document.querySelector('#secretIdBox').value = json.id
    document.querySelector('#name').value = json.fullName
    document.querySelector('#numOfModels').value = json.numOfModels
    if (json.junior) {
        document.querySelector('#yesJunior').checked = true
    } else {
        document.querySelector('#notJunior').checked = true
    }
    if (json.inCompetition) {
        document.querySelector('#yesInComp').checked = true
        document.querySelector('#notInComp').checked = false
    } else {
        document.querySelector('#yesInComp').checked = false
        document.querySelector('#notInComp').checked = true
    }
    if (json.judged && json.judged !== "N/A") {
        document.querySelector('#yesJudged').checked = true
    } else if (json.judged == "N/A") {
        document.querySelector('#notForJudging').checked = true
    } else if (!json.judged) {
        document.querySelector('#notJudged').checked = true
    }
}

