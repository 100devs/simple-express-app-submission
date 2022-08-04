let _timeLimit = 25;
let interval;
var audio = new Audio('assets/mixkit-positive-notification-951.wav');
audio.volume = 0.5;
var isPaused = true;
let totalSeconds;
let tasks = [];

if (window.localStorage.getItem('timeLeft')) {
    totalSeconds = window.localStorage.getItem('timeLeft');
} else {
    window.localStorage.setItem('timeLeft', 1500);
    totalSeconds = window.localStorage.getItem('timeLeft');
}


let ALL_TASKS = [];
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task-button');
const bigTimer = document.getElementById('timer');


function loadData() {

    // fetch('/tasks')
    //     .then(res => {
    //         if (res.ok) return res.json()
    //     })
    //     .then(response => {
    //         response.forEach(element => {
    //             let tempTask = document.createElement('li');
    //             let delButton = document.createElement('button');
    //             delButton.innerText = 'X'
    //             delButton.id = element._id;
    //             delButton.addEventListener('click', deleteTask);
    //             tempTask.innerText = element.detail;
    //             tempTask.appendChild(delButton);
    //             // taskList.appendChild(delButton);
    //             taskList.appendChild(tempTask, delButton);
    //         });
    //     })

    bigTimer.innerHTML = prependZero(Math.floor(totalSeconds / 60)) + ':' + prependZero(totalSeconds % 60);
}

const fruits = {

    0: {
        Name: 'Tomato',
        Count: 0,
        HexVal: '127813'
    },
    1: {
        Name: 'Eggplant',
        Count: 0,
        HexVal: '127814'
    },
    2: {
        Name: 'Grape',
        Count: 0,
        HexVal: '127815'
    },
    3: {
        Name: 'Melon',
        Count: 0,
        HexVal: '127816'
    },
    4: {
        Name: 'Watermelon',
        Count: 0,
        HexVal: '127817'
    },
    5: {
        Name: 'Orange',
        Count: 0,
        HexVal: '127818'
    },
    6: {
        Name: 'Lemon',
        Count: 0,
        HexVal: '127819'
    },
    7: {
        Name: 'Banana',
        Count: 0,
        HexVal: '127820'
    },
    8: {
        Name: 'Pineapple',
        Count: 0,
        HexVal: '127821'
    },
    9: {
        Name: 'RedApple',
        Count: 0,
        HexVal: '127822'
    },
    10: {
        Name: 'GreenApple',
        Count: 0,
        HexVal: '127823'
    },
    11: {
        Name: 'Pear',
        Count: 0,
        HexVal: '127824'
    },
    12: {
        Name: 'Peach',
        Count: 0,
        HexVal: '127825'
    },

    13: {
        Name: 'Cherry',
        Count: 0,
        HexVal: '127826'
    },
    14: {
        Name: 'Strawberry',
        Count: 0,
        HexVal: '127827'
    }
}

function setTimeLimit(timeLimit) {
    stop();
    if (timeLimit === 25) {
        document.getElementById('timer').innerHTML = '25:00';
    }
    if (timeLimit === 15) {
        document.getElementById('timer').innerHTML = '15:00';
    }
    if (timeLimit === 5) {
        document.getElementById('timer').innerHTML = '05:00';
    }
    _timeLimit = prependZero(timeLimit);

    reset();
}

function start() {

    if (totalSeconds > 0) {
        document.getElementById('startButton').disabled = true;
        interval = window.setInterval(calculateTime, 1000);
    }

    if (!isPaused) {
        totalSeconds = _timeLimit * 60;
    }
}

function calculateTime() {

    window.localStorage.setItem('timeLeft', totalSeconds);
    totalSeconds = localStorage.getItem('timeLeft');

    totalSeconds -= 1;
    document.getElementById('timer').innerHTML =
        prependZero(Math.floor(totalSeconds / 60)) + ':' + prependZero(totalSeconds % 60);

    if (totalSeconds === 0) {
        stop();
        //getRandomFruit();
        collectFruit();
        audio.play();
    }
}

function stop() {
    window.clearInterval(interval);
    document.getElementById('startButton').disabled = false;
    isPaused = true;
}

function reset() {
    stop();
    totalSeconds = _timeLimit * 60;
    document.getElementById('timer').innerHTML = _timeLimit + ':00';
    window.localStorage.setItem('timeLeft', totalSeconds);
}

function prependZero(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}

addTaskButton.addEventListener('click', _ => {

    var taskData = document.getElementById('add-task-input');
    // console.log(taskData.value);
    // let task = {
    //     id: Math.round(Math.random() * 100000),
    //     data: taskData.value
    // }


    if (taskData.value != "") {
        tasks.push(JSON.stringify(`'id': ${Math.round(Math.random() * 100000)},'data': ${taskData.value}`));

        window.localStorage.setItem('tasks', tasks)
        const newTask = document.createElement('li');
        let newTaskData = document.createElement('p');

        let delButton = document.createElement('button');
        let completeButton = document.createElement('button');

        // newTask.style = 'float: left'
        completeButton.innerText = 'Done'
        delButton.innerText = 'X'

        delButton.addEventListener('click', deleteTask);
        completeButton.addEventListener('click', completeTask);
        // delButton.style = 'float: right';

        newTaskData.innerText = taskData.value;

        newTask.appendChild(delButton);
        newTask.appendChild(completeButton);
        newTask.appendChild(newTaskData)
        // newTask.innerHTML(taskData.value);
        // taskList.appendChild(document.createElement('li'));
        // console.log(window.localStorage.getItem(tasks[0]));
        taskList.appendChild(newTask);
        // fetch('/tasks', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         detail: taskData.value
        //     })
        // })
        //     .then(res => {
        //         if (res.ok) return res.json()
        //     })
        //     .then(response => {
        //         window.location.reload(true)
        //     })
    }
})


function deleteTask() {
    // fetch(`/tasks/${this.id}`, {
    //     method: 'DELETE'
    // })
    //     .then(res => {
    //         if (res.ok) return res.json()
    //     })
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err));
    // location.reload();
}

function completeTask() {
    var clickedID = this.parentElement.id;
    // console.log(clickedID);
    // getRandomFruit();
    // ALL_TASKS.forEach(task => {
    //     if (task.ID == clickedID) {
    //         task.complete = true;

    //     }
    // });
    // document.getElementById(clickedID).remove();
    // localStorage.setItem('fruitCollection', JSON.stringify(fruits));
    // //show our fruit collection
    // collectFruit();

}
// 16 total fruit emojis. Make a function to compelete a task, or whenever 25 minutes goes by to collect a new randomly given fruit.
//store completed tasks in local storage? JS Object to represent a task?

function getRandomFruit() {
    var rand = Math.ceil(Math.random() * 15 - 1);
    var fruitKeys = Object.keys(fruits);
    for (let i = 0; i < fruitKeys.length; i++) {
        if (fruitKeys[i] == rand) {
            fruits[i].Count += 1;
        }
    }
}

function getFruitByName(name) {
    var fruitKeys = Object.keys(fruits);
    for (let i = 0; i < fruitKeys.length; i++) {
        if (fruits[i].Name.toLowerCase() == name.toLowerCase()) {
            console.log(fruits[i].Name);
            return fruits[i];
        }
    }
}

function collectFruit() {

    //loop through fruits, find anything with a counter higher than 0, show that emoji with its count beside it.
    var storedFruits = JSON.parse(localStorage.getItem('fruitCollection'));
    var fruitKeys = Object.keys(storedFruits);
    //delete all children and then update DOM with newest data
    //document.getElementById('fruit-collection').innerHTML = '';
    //fruitEmoji.innerHTML = '';
    for (let i = 0; i < fruitKeys.length; i++) {
        if (storedFruits[i].Count > 0) {
            var fruitEmoji = document.createElement('p');
            var count = document.createElement('span');
            fruitEmoji.className = 'emoji';
            count.className = 'count';
            fruitEmoji.innerHTML = '&#' + storedFruits[i].HexVal + ';';
            count.innerHTML = storedFruits[i].Count;
            document.getElementById('fruit-collection').appendChild(fruitEmoji);
            fruitEmoji.appendChild(count);
        }
    }
}

function Task(description, complete, ID) {
    this.description = description;
    this.complete = complete;
    this.ID = ID;
}