const doSomethings = document.querySelectorAll('button[data-action="do-something"]')
doSomethings.forEach(button => button.addEventListener('click', e => showForms(e)))

// click a focused element using Enter and spacebar
function checkKeyActivate(e, callback){
    // callback is whatever should be triggered on mouse click
    if (e.keyCode === 13 || e.keyCode === 32) { 
        console.log(`Keycode is ${e.keyCode}`)
        callback();
    }else {
        return
    }
}

//toggle checkboxes (filter and search toggles) on Enter and spacebar
const toggles = document.querySelectorAll('label[data-action="toggle"]')
toggles.forEach(toggle => toggle.addEventListener('keyup', e=>toggleCheck(e)))

function toggleCheck(e){ 
    if (e.keyCode === 13 || e.keyCode === 32) { //if ENTER key or spacebar
        // need to target the input to which the label applies
        const checkbox = e.target.nextElementSibling 
        checkbox.checked = !checkbox.checked;
    }
}

// go to top snippet
const backToTop = document.querySelector('[data-action="goTopShowAll"]')
backToTop.addEventListener('click', scrollToTopAndRedirect)
backToTop.addEventListener('keyup', e =>{checkKeyActivate(e, scrollToTopAndRedirect);})

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

function scrollToTopAndRedirect(){ //for backToTop only. bc keypress wrapper.
    scrollToTop();
    window.location.assign('/')
}

// filtering
const tags = document.querySelectorAll('[data-tag]')
tags.forEach(elem => elem.addEventListener('click', e => filterByTag(e)))
// not a beautiful callback
let focused;
tags.forEach(elem => elem.addEventListener('keyup', e => {checkKeyActivate(e, changeFocus)}))
tags.forEach(elem => elem.addEventListener('keyup', e => wrapFilterByTag(e)))

function changeFocus(){
    focused = true;
}

function wrapFilterByTag(e){
    if (focused === true){
        const tag = e.currentTarget.textContent.toLowerCase();
        try {
            window.location.assign(`/tags/${tag}`)
        }catch(err){
            console.log(err)
        }
    }
}

function filterByTag(e){
    const tag = e.target.textContent.toLowerCase();
    try {
        /*Whenever a new value is assigned to the location object, 
        a document will be loaded using the URL 
        as if location.assign() had been called with the modified URL. */
        window.location.assign(`/tags/${tag}`)
    }catch(err){
        console.log(err)
    }
}

// search title strings
const search = document.querySelector('#search')
search.addEventListener('change', activateSearch)

async function activateSearch(){
    const searchTerm = search.value;
    try {
        console.log('Continue here line 35')
        // send word to backend, find by fragment in title on Mongo. Redirect to page of results.
        location.assign(`/search?term=${searchTerm}`)
    }
    catch(err){
        console.log(err)
    }
}

// show only the relevant form
function showForms(event){
    document.querySelectorAll('[data-action-type]').forEach(elem => elem.dataset.actionType === event.target.value ? elem.classList.toggle('hidden') : elem.classList.add('hidden'))
    scrollToTop();
}

// delete req
let deleteButtons = document.querySelectorAll('button[data-action="delete"]')
deleteButtons.forEach(button => button.addEventListener('click', e=> deleteThat(e)))

async function deleteThat(e){
    try{
        const titleBye = e.target.parentElement.parentElement.querySelector('h3').textContent
        const passcode = prompt(`Are you sure you want to delete ${titleBye}? Provide passcode:`, '')
        const response = await fetch('/deletePic', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               'title': titleBye,
               passcode
            })
        })
        const data = await response.json()
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// conditional check on asset link type
const urlTypeCheck = document.querySelector('label[data-type="asset-label"]')
const fieldInput = document.querySelector('#field')
fieldInput.addEventListener('change', showTypeOption)

function showTypeOption(){
    if (fieldInput.value === 'Asset URL'){
        urlTypeCheck.classList.remove('hidden')
    }else if (fieldInput.value !== 'Asset URL'){
        urlTypeCheck.classList.add('hidden')
    }
}

// update/put req
// the buttons that make the form
let startUpdateButtons = document.querySelectorAll('button[data-detail="update-entry"]')
startUpdateButtons.forEach(button => button.addEventListener('click', e => startUpdate(e)))

// the do-Somethings function handles the appearance of the form and fires first
// although probably that handler no longer does much good since weird behavior happening with toggle
function startUpdate(e){
    const titleChange = e.target.parentElement.parentElement.querySelector('h3').textContent
    // double parentElement is owing to the .button-box added for styling
    document.querySelector('span[data-type="entry-update"]').textContent = titleChange
    // console.log(titleChange + "1")
}

// the form button that actually updates
const updateButton = document.querySelector('button[data-action="update"]')
updateButton.addEventListener('click', updateEntry)

async function updateEntry(){
    const title = document.querySelector('span[data-type="entry-update"]').textContent
    // there must be a more elegant way to pass state, but this isn't a React app...yet
    // console.log(title + "2")
    const passcode = prompt('Provide passcode:', '')
    
    const edit = document.querySelector('input[name="edit"]').value
    const field = document.querySelector('#field').value
    const urlType = document.querySelector('#video').value
    try{
        const response = await fetch('/update', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': title,
                field,
                edit,
                urlType,
                passcode
            })
        })
        document.querySelector('input[name="edit"]').value = ""
        location.reload()
    }catch(err){
        console.log(err)
    }
}