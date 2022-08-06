// define variables
const form = document.querySelector('form');
const taskNameEl = document.getElementById('taskName') as HTMLInputElement;
const descriptionEl = document.getElementById('description') as HTMLTextAreaElement;
const priorityEl = document.getElementById('priority') as HTMLSelectElement;
const stateEl = document.getElementById('state') as HTMLSelectElement;
const taskListEl = document.querySelector('.task-list');
const taskIdEl = document.querySelector('#taskId') as HTMLInputElement;
    const arrTaskPriority =  ['Low',"Normal","Hight","Urgent"];
    const defaultPriority = 1;

    const arrTaskState = ['Pending', 'Fullfilled'];
    const defaultPending = 1;



taskListEl?.addEventListener('click', (e: Event) => {

    if(e !== null && e.target !== null) {
        const element = e.target as Element;
        const thisElement = e.target as HTMLElement;
        const task = thisElement.closest('.task-item') as HTMLElement;

      console.log(task)
        /****************************************************************
         *           UPDATE
         */
        if(element.matches('.fa-edit')) {
            /*
            * On click on the edit icon, fill the form element with
            */
              taskIdEl.value = task?.dataset?.id || '';
              taskNameEl.value = (task?.querySelector('.taskname')?.textContent || '').trim();
              descriptionEl.value = (task?.querySelector('.description')?.textContent || '').trim();
              priorityEl.value = task.querySelector('.priority')?.textContent || '';
              stateEl.value = task.querySelector('.state')?.textContent || '';

            console.log(task?.dataset?.id,taskIdEl.value,taskNameEl.value,descriptionEl.value)
        }



        /****************************************************************
         *           DELETE
         */
      if(element.matches('.fa-trash')) {

            fetch(`/api/todo/${task.dataset.id}`, {
              method: 'delete',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                "id": task.dataset.id
              })
            })
        .then(res => {
            let statusCode = res.status,
                error = statusCode >= 400 && statusCode <= 500 ? console.log(`error statusCode ${statusCode}`): null
            if (error) {
                console.log(error)
            } else if (statusCode >= 200 && statusCode <= 300) {
                // we have a successful delete in database.
                // remove the element to list.
                task.remove();
             }
        })

            .then(data => console.log(data))
            .catch(err => console.error(err))
      }

    }

})


function populateTodosList(tasksList: []| [{}]) {
    tasksList.map((task:any) => {
        insertNewTask(task);
    })
}

function insertNewTask(task:any) {
  taskListEl?.insertAdjacentHTML('afterbegin',`
          <div class="task-item" data-id="${task?._id}">
            <div class="info">
            <div class="left-col">
            <i class="fa fa-edit ${task?.state === 'Fullfilled' ? 'fullfilled' : 'pending'}"></i>
            <span class="taskname">${task?.name}</span>
            </div>
            <div class="right-col">
            <span class="priority">${task?.priority}</span>
            <span class="state">${task?.state}</span>
            <i class="fa fa-trash"></i>
            </div>
</div>
            <div class="description">
                 ${task?.description}
              </div>
          </div>
        `)
}

        // <select name="priority">
            //   +
            //       priority.map((prio,index) => {
            //         return `<option value="${index} ${defaultPriority === task.priority} ? 'selected' : '' }">${prio}</option>`
            //       })
            //   +
            //   `</select>
          	// <select name="state">`
            //   +
            //       pending.map((state,index) => {
            //         return `<option value="${index} ${defaultPending === task.state ? 'selected' : '' }">${state}</option>`
            //       })
            //   +
            //   `</select>


// Form submit
form?.addEventListener('submit', (e) => {

	// don't send the form
	e.preventDefault();

  const postData = {
      id: taskIdEl.value,
			name: taskNameEl.value,
			description: descriptionEl.value,
			priority: priorityEl.value,
			state: stateEl.value,
    };

    let method = taskIdEl.value ? 'put' : 'post';
    let url = '/api/todo';
    url += taskIdEl.value ? `/${taskIdEl.value}` : '';


	fetch(url, {
    method: method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postData)
  }).then(res => {
            let statusCode = res.status,
                error = statusCode >= 400 && statusCode <= 500 ? console.log(`error statusCode ${statusCode}`): null
            if (error) {
                console.log(error)
            } else if (statusCode >= 200 && statusCode <= 300) {
                // we have a successful post to database.
                // add the last element to list.
                taskIdEl.value ?  reloadTask(postData)   :        insertNewTask(postData);
            }
        })
	// on error, display an error message in the console too
    .catch(error => console.error(error))

	//console.dir(Options);

});

function reloadTask(task:any) {
      const selectedTask = document.querySelector(`.task-item[data-id="${task.id}"]`);
      let taskEl = selectedTask?.querySelector('.taskname');
      let descriptionEl = selectedTask?.querySelector('.description');
      let priorityEl = selectedTask?.querySelector('.priority');
      let stateEl = selectedTask?.querySelector('.state')



              if(taskEl)  taskEl.textContent = task.name;
              if(descriptionEl) descriptionEl.textContent = task.description;
              if(priorityEl) priorityEl.textContent = task.priority;
              if(stateEl) {
                stateEl.textContent = task.state
                let trashIcon = selectedTask?.querySelector('fa-trash');
                if(task.state === "Fullfilled") {
                    if(trashIcon?.classList.contains('pending')) trashIcon.classList.remove('pending');
                    if(!trashIcon?.classList.contains('fullfilled')) trashIcon?.classList.add('fullfilled');
                } else {
                    if(trashIcon?.classList.contains('fullfilled')) trashIcon.classList.remove('fullfilled');
                    if(!trashIcon?.classList.contains('pending')) trashIcon?.classList.add('pending');
                }


              }


}

// var update = document.getElementById('update')
// var del = document.getElementById('delete')

  async function getTodosList(){
    var data = await fetch('api/todo')
  .then((response) => response.json())
  .then((data) =>
    data ? populateTodosList(data) : console.log('No task in the list '))
}

(() => {

  // fetch data on load ?
  getTodosList();
})()
