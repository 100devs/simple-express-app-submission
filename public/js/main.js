const completeTask = document.querySelectorAll('.taskComplete')
const deleteTask = document.querySelectorAll('.taskDelete')
const editTask = document.querySelectorAll('.editTask')

Array.from(completeTask).forEach(element => {
    element.addEventListener('click', setComplete)
})

Array.from(deleteTask).forEach(element => {
    element.addEventListener('click', setDelete)
})

Array.from(editTask).forEach(element => {
    element.addEventListener('click', openEdit)
})

// *************************************************************************************************
// Set task as complete
// *************************************************************************************************

async function setComplete() {
    const taskName = this.parentNode.parentNode.childNodes[1].innerText

    try {
        const response = await fetch('completeTask', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                taskName: taskName,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

// **************************************************************************************************
// Delete task
// **************************************************************************************************

async function setDelete() {
    const taskName = this.parentNode.parentNode.childNodes[1].innerText
    console.log(taskName)
    try {
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'taskName': taskName
            })
        })
        const data = await response.json()
        console.log(data.body)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

// **************************************************************************************************
// Edit task
// **************************************************************************************************

// Open edit form, with current text values in place.
function openEdit() {
    const currentTaskName = this.parentNode.parentNode.childNodes[1].innerText
    const currentTaskDescription = this.parentNode.parentNode.childNodes[3].innerText

    if (typeof editForm.showModal === "function") {
        document.querySelector('#editTaskInput').value = currentTaskName
        document.querySelector('#editTaskDescription').value = currentTaskDescription
        editForm.showModal();
    }
    // Edit button event
    const editTaskButton = document.querySelector('.editButton')
    editTaskButton.addEventListener('click', setEdit)
    // Edit fetch, searching database with current task name, sending edited task name and description
    async function setEdit() {
        const newTaskName = this.parentNode.childNodes[1].value
        console.log(newTaskName)
        const newTaskDescription = this.parentNode.childNodes[3].value
        console.log(newTaskDescription)
        try {
            const response = await fetch('editTask', {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    currentTaskName: currentTaskName,
                    newTaskName: newTaskName,
                    newTaskDescription: newTaskDescription
                })

            })
            const data = await response.json()
            console.log(data)
            location.reload()
        } catch (err) {
            console.log(err)
        }
    }
}

// **********************************************************
// Displays add task form on click
// **********************************************************
const addTaskClick = document.querySelector('.addTaskClick')
const addForm = document.querySelector('#addForm')

addTaskClick.addEventListener('click', showForm)

function showForm() {
    if (typeof addForm.showModal === "function") {
        addForm.showModal();
    }
}

// **************************************************************************************************
// Close add and edit task forms
// **************************************************************************************************
const closeAdd = document.querySelector('#closeAdd')
const closeEdit = document.querySelector('#closeEdit')


closeAdd.addEventListener('click', closeForm)
closeEdit.addEventListener('click', closeForm)

function closeForm() {
    editForm.close()
    addForm.close()
}

// **********************
// TASK START SCALE
// **********************
// const startScale = document.querySelector('#startScale');
// const startOutput = document.querySelector('.startScale-output');

// startOutput.textContent = startScale.value;

// startScale.addEventListener('input', function() {
//   startOutput.textContent = startScale.value;
// });

// ***********************************
// Menu
// ***********************************
const selectMainMenu = document.querySelector('.selectMainMenu')
const menuDialog = document.querySelector('#mainMenu')

menuDialog.addEventListener('click', () => menuDialog.close())







// *************************************************************
// POMO TIMER
// *************************************************************

function startTimer(duration, minutesDisplay, secondsDisplay) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        minutesDisplay.textContent = minutes
        secondsDisplay.textContent = seconds

        if (--timer < 0) {
            timer = duration;
        }
        
        
    }, 1000);
}
// set this to start on click
// create input
const startingTimer = document.querySelector('.start')
startingTimer.addEventListener('click', hereWeGo)

function hereWeGo () {
    let fiveMinutes = 60 * 45,
        minutes = document.querySelector('#minutes')
        seconds = document.querySelector('#seconds')
        
    startTimer(fiveMinutes, seconds, minutes);
}


