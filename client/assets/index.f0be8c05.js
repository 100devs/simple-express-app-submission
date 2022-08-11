const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
const app = "";
const form = document.querySelector("form");
const taskNameEl = document.getElementById("taskName");
const descriptionEl = document.getElementById("description");
const priorityEl = document.getElementById("priority");
const stateEl = document.getElementById("state");
const taskListEl = document.querySelector(".task-list");
const taskIdEl = document.querySelector("#taskId");
taskListEl == null ? void 0 : taskListEl.addEventListener("click", (e) => {
  var _a, _b, _c, _d, _e, _f;
  if (e !== null && e.target !== null) {
    const element = e.target;
    const thisElement = e.target;
    const task = thisElement.closest(".task-item");
    console.log(task);
    if (element.matches(".fa-edit")) {
      taskIdEl.value = ((_a = task == null ? void 0 : task.dataset) == null ? void 0 : _a.id) || "";
      taskNameEl.value = (((_b = task == null ? void 0 : task.querySelector(".taskname")) == null ? void 0 : _b.textContent) || "").trim();
      descriptionEl.value = (((_c = task == null ? void 0 : task.querySelector(".description")) == null ? void 0 : _c.textContent) || "").trim();
      priorityEl.value = ((_d = task.querySelector(".priority")) == null ? void 0 : _d.textContent) || "";
      stateEl.value = ((_e = task.querySelector(".state")) == null ? void 0 : _e.textContent) || "";
      console.log((_f = task == null ? void 0 : task.dataset) == null ? void 0 : _f.id, taskIdEl.value, taskNameEl.value, descriptionEl.value);
    }
    if (element.matches(".fa-trash")) {
      fetch(`/api/todo/${task.dataset.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "id": task.dataset.id
        })
      }).then((res) => {
        let statusCode = res.status, error = statusCode >= 400 && statusCode <= 500 ? console.log(`error statusCode ${statusCode}`) : null;
        if (error) {
          console.log(error);
        } else if (statusCode >= 200 && statusCode <= 300) {
          task.remove();
        }
      }).then((data) => console.log(data)).catch((err) => console.error(err));
    }
  }
});
function populateTodosList(tasksList) {
  tasksList.map((task) => {
    insertNewTask(task);
  });
}
function insertNewTask(task) {
  taskListEl == null ? void 0 : taskListEl.insertAdjacentHTML("afterbegin", `
          <div class="task-item" data-id="${task == null ? void 0 : task._id}">
            <div class="info">
            <div class="left-col">
            <i class="fa fa-edit ${(task == null ? void 0 : task.state) === "Fullfilled" ? "fullfilled" : "pending"}"></i>
            <span class="taskname">${task == null ? void 0 : task.name}</span>
            </div>
            <div class="right-col">
            <span class="priority">${task == null ? void 0 : task.priority}</span>
            <span class="state">${task == null ? void 0 : task.state}</span>
            <i class="fa fa-trash"></i>
            </div>
</div>
            <div class="description">
                 ${task == null ? void 0 : task.description}
              </div>
          </div>
        `);
}
form == null ? void 0 : form.addEventListener("submit", (e) => {
  e.preventDefault();
  const postData = {
    id: taskIdEl.value,
    name: taskNameEl.value,
    description: descriptionEl.value,
    priority: priorityEl.value,
    state: stateEl.value
  };
  let method = taskIdEl.value ? "put" : "post";
  let url = "/api/todo";
  url += taskIdEl.value ? `/${taskIdEl.value}` : "";
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }).then((res) => {
    let statusCode = res.status, error = statusCode >= 400 && statusCode <= 500 ? console.log(`error statusCode ${statusCode}`) : null;
    if (error) {
      console.log(error);
    } else if (statusCode >= 200 && statusCode <= 300) {
      taskIdEl.value ? reloadTask(postData) : insertNewTask(postData);
    }
  }).catch((error) => console.error(error));
});
function reloadTask(task) {
  const selectedTask = document.querySelector(`.task-item[data-id="${task.id}"]`);
  let taskEl = selectedTask == null ? void 0 : selectedTask.querySelector(".taskname");
  let descriptionEl2 = selectedTask == null ? void 0 : selectedTask.querySelector(".description");
  let priorityEl2 = selectedTask == null ? void 0 : selectedTask.querySelector(".priority");
  let stateEl2 = selectedTask == null ? void 0 : selectedTask.querySelector(".state");
  if (taskEl)
    taskEl.textContent = task.name;
  if (descriptionEl2)
    descriptionEl2.textContent = task.description;
  if (priorityEl2)
    priorityEl2.textContent = task.priority;
  if (stateEl2) {
    stateEl2.textContent = task.state;
    let trashIcon = selectedTask == null ? void 0 : selectedTask.querySelector("fa-trash");
    if (task.state === "Fullfilled") {
      if (trashIcon == null ? void 0 : trashIcon.classList.contains("pending"))
        trashIcon.classList.remove("pending");
      if (!(trashIcon == null ? void 0 : trashIcon.classList.contains("fullfilled")))
        trashIcon == null ? void 0 : trashIcon.classList.add("fullfilled");
    } else {
      if (trashIcon == null ? void 0 : trashIcon.classList.contains("fullfilled"))
        trashIcon.classList.remove("fullfilled");
      if (!(trashIcon == null ? void 0 : trashIcon.classList.contains("pending")))
        trashIcon == null ? void 0 : trashIcon.classList.add("pending");
    }
  }
}
async function getTodosList() {
  await fetch("api/todo").then((response) => response.json()).then((data2) => data2 ? populateTodosList(data2) : console.log("No task in the list "));
}
(() => {
  getTodosList();
})();
