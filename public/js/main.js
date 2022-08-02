
// const addTaskButton = document.querySelectorAll('.addTaskButton')
const deleteTaskButtons = document.querySelectorAll('.task-delete')
const deleteActionListButtons = document.querySelectorAll('.actionList-closeButton')
const todos = document.querySelectorAll('.todo-li');
const actionLists = document.querySelectorAll('.actionList');
const inputModal = document.querySelector('.modal-todo-input');

// todo listeners
Array.from(todos).forEach((element) => {
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
})

async function dragStart(ev){
    this.className += ' dragging';
    console.log(this)
    ev.dataTransfer.setData("taskID", this.childNodes[1].innerText);
    ev.dataTransfer.setData('oldListID', this.childNodes[3].innerText);
    setTimeout(() => this.className += "hidden", 0)
}

async function dragEnd(){
    this.classList.remove('hidden');
}

//action lists
Array.from(actionLists).forEach((element) => {
    element.addEventListener('dragover', dragOver)
    element.addEventListener('dragenter', dragEnter)
    element.addEventListener('dragleave', dragLeave)
    element.addEventListener('drop', dragDrop)
})

async function dragOver(e){
    e.preventDefault();

}
async function dragEnter(e){
    e.preventDefault();
    this.className += ' hovered';
}
async function dragLeave(){
    this.classList.remove('hovered')
}
async function dragDrop(ev){
    
    
    ev.preventDefault();
    
    const taskID = ev.dataTransfer.getData("taskID");
    const oldListID = ev.dataTransfer.getData("oldListID");
    const newListId = this.attributes.name.nodeValue;

    await addTaskArgs(newListId, taskID)
    await deleteTaskArgs(oldListID, taskID)
    
    location.reload();
}


Array.from(deleteTaskButtons).forEach((element) => {
    element.addEventListener('click', deleteTask);
})

Array.from(deleteActionListButtons).forEach((element) => {
    element.addEventListener('click', deleteActionList);
})

async function deleteTaskArgs(listID, taskID) {    

    try {
        const response = await fetch('deleteTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'listID': listID,
                'taskID': taskID
            })
        })
        const data = await response.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
}



async function deleteTask() {
    const listID = this.parentNode.parentNode.parentNode.parentNode.parentNode.attributes[1].nodeValue;
   
    const taskID = this.parentNode.parentNode.parentNode.childNodes[1].innerText;

    try {
        const response = await fetch('deleteTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'listID': listID,
                'taskID': taskID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload();
    }catch(err){
        console.log(err)
    }
}

async function editTask(
                            listID = this.parentNode.parentNode.parentNode.parentNode.parentNode.attributes[1].nodeValue,
                            taskID = this.parentNode.parentNode.parentNode.childNodes[1].innerText
                        ) {
    const taskData = await getTaskDataByID(taskID);
    populateTaskModal(taskData)
}

async function populateTaskModal(taskDataArray) {
    //taskname input

    document.querySelector('#task-modal-taskid').innerText = taskDataArray.id || "";
    document.querySelector('#modal-todo-taskname').value = taskDataArray.taskName || "";
    document.querySelector('#modal-todo-notes').value = taskDataArray.notes || "";
    document.querySelector('#select-difficulty').value = taskDataArray.difficulty || 1;
    document.querySelector('#select-dueDate').value = taskDataArray.dueDate || "";

}

async function addTaskArgs(listID, taskID) {
    
    const taskData = await getTaskDataByID(taskID)
    try {        
        const response = await fetch('addTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': listID,
                'taskName': taskData.taskName || "",
                'notes': taskData.taskNotes || "",
                'difficulty': taskData.difficulty,
                'dueDate': taskData.dueDate || ""
            })
        })
        const data = await response.json()
        console.log(data);
    }catch(err){
        console.log(err)
    }    
}

async function deleteActionList(){
    const listID = this.parentNode.parentNode.attributes[1].nodeValue;

    try {
        const response = await fetch('deleteList', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'listID': listID
            })
        })
        const data = await response.json();
        
        location.reload()
        console.log(data)
    
    }catch(err){
        console.log(err)
    }
}

// Input Modal

pseudoToDoInputs = document.querySelectorAll('.section-addTask-button');

Array.from(pseudoToDoInputs).forEach((element) => {
    element.addEventListener('click', showInputModal)
})

async function showInputModal(ev) {
    ev.preventDefault();

    const listID = this.parentNode.attributes.name.nodeValue;
    inputModal.dataset.listid = listID;    
    inputModal.style.display = "block";
}

document.querySelectorAll('.modal-input-task-close').forEach((element) => {
    element.addEventListener('click', hideInputModal);
})

async function hideInputModal(){
    inputModal.style.display = "none";
}


// submit todo input modal
const submitModal = document.querySelector('#submitTodo');

submitModal.addEventListener('click', submitInputModal)

async function submitInputModal(){
    console.log(this.parentNode.parentNode);

    const listID = this.parentNode.parentNode.parentNode.parentNode.dataset.listid;
    const taskName = this.parentNode.parentNode.querySelector('#modal-todo-taskname').value;
    const taskNotes = this.parentNode.parentNode.querySelector('#modal-todo-notes').value;
    const difficultyNumber = this.parentNode.parentNode.querySelector('#select-difficulty').value;
    const dueDate = this.parentNode.parentNode.querySelector('#select-dueDate').value;
    hideInputModal();
    try {
        const response = await fetch('addTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': listID,
                'taskName': taskName || "",
                'notes': taskNotes || "",
                'difficulty': difficultyNumber,
                'dueDate': dueDate || ""
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload();
    }catch(err){
        console.log(err)
    }
}


async function getTaskDataByID(taskID){    

    try {
        const response = await fetch('getTask', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': taskID
            })
        })
        const data = await response.json();               
        return data;
    
    }catch(err){
        console.log(err)
    }
}

const taskActionsButtons = document.querySelectorAll('.task-actions-expand')

Array.from(taskActionsButtons).forEach((element) =>{
    element.addEventListener('click', showTaskActionMenu);
})

async function showTaskActionMenu(){
    this.parentNode.querySelector('.task-actions-dropdown').classList.toggle('show')
}

window.onclick = function(event) {
    if (!event.target.matches('.task-actions-expand')) {
      var dropdowns = document.getElementsByClassName("task-actions-dropdown");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  async function getListIDbyTaskID(taskID){
    try {
        const response = await fetch('getListID', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': taskID
            })
        })
        const ListID = await response.json();              
        return ListID;
    
    }catch(err){
        console.log(err)
    }
  }

  