let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

document.querySelector('#create').addEventListener('click', selectMain);
let tabs = document.querySelectorAll('.tabs a');
tabs.forEach(tab => tab.addEventListener('click', selectTab));
let topNavButtons = document.querySelectorAll('.small a');
topNavButtons.forEach(button => button.addEventListener('click', selectMain));
let navButtons = document.querySelectorAll('.footer li');
navButtons.forEach(button => button.addEventListener('click', selectMain));


document.querySelector('#mach').addEventListener('change', setMachNums);
document.querySelector('#mod').addEventListener('change', setMachNums);
document.querySelector('.back').addEventListener('click', hideWORequestMain)
document.querySelector('.respond').addEventListener(touchEvent, respondToWorkOrder);
document.querySelector('.close').addEventListener(touchEvent, closeWorkOrder);
document.querySelector('.delete').addEventListener(touchEvent, deleteWorkOder);
document.querySelector('#woRequest').addEventListener('click', postWorkOder);

// NON SERVER FUNCTIONALITY
function setMachNums() {
    let module = Number(document.querySelector('#mod').value);
    let machine = Number(document.querySelector('#mach').value);
    let sp = 1,
        bal = 2,
        liners = 6,
        cp = 3,
        ab = 3;

    if (module === 1 || module === 3 || module === 4 || module === 7) {
        bal = 3
    }
    if (module === 7) {
        liners = 1;
        cp = 1;
        ab = 1;
    } else if (module === 5 || module === 6) {
        liners = 5;
        cp = 2;
        ab = 2;
    }

    switch (machine) {
        case 1:
            addOption(sp);
            break;
        case 2:
            addOption(bal);
            break;
        case 3:
            addOption(liners);
            break;
        case 4:
            addOption(cp);
            break;
        case 5:
            addOption(ab);
            break;
    }
}
function selectTab() {
    this.classList.add('selected');
    if (this === tabs[0]) {
        tabs[1].classList.remove('selected');
        document.querySelector('#openedWorkOrders').classList.remove('hidden');
        document.querySelector('#closedWorkOrders').classList.add('hidden');
        getWorkOrders('open');
    } else {
        tabs[0].classList.remove('selected');
        document.querySelector('#openedWorkOrders').classList.add('hidden');
        document.querySelector('#closedWorkOrders').classList.remove('hidden');
        getWorkOrders('closed');
    }
}
function selectMain() {
    let className = this.classList[0];
    hideMain(navButtons, this, className);
    hideMain(topNavButtons, this, className);
    if (!this.classList.contains('topNavButtons')) {
        document.querySelector(`footer .${className}`).classList.add('selected');
    }
    if (className === 'workOrdersMain') getWorkOrders('open');
}
function hideMain(buttons, clickedButton, className) {
    document.querySelector('main .createWOMain').classList.add('hidden');
    document.querySelector('.woRequestMain').classList.add('hidden');
    document.querySelector(`main .${className}`).classList.remove('hidden');

    navButtons.forEach(button => button.classList.remove('selected'));
    buttons.forEach(button => {
        if (button !== clickedButton) {
            className = button.classList[0];
            document.querySelector(`main .${className}`).classList.add('hidden');
        }
    });
}
function showWoInfo(data) {
    let dept = getDepartmentName(data.reqDept);
    let machine = getMachineName(data.mach);

    document.querySelector('#woNum').innerText = data.workOrderNum;
    document.querySelector('#status').innerText = data.status;
    document.querySelector('#reqShop').innerText = dept;
    document.querySelector('#location').innerText = `${machine} ${data.mod}${data.machNum}`;
    document.querySelector('#problemDetail').innerText = data.probDetail;
    document.querySelector('#reqBy').innerText = `${data.reqEmp} - ${data.reqEmpTitle}`;
    document.querySelector('#resEmp').innerText = `${data.resEmp} - ${data.resEmpTitle}`;

    if (data.status === 'open' && !document.querySelector('#solDetail').firstChild) {
        let textArea = document.createElement('textarea');
        textArea.classList.add('solDetailText');
        document.querySelector('#solDetail').appendChild(textArea);
        document.querySelector('.respond').classList.remove('disabled');
        document.querySelector('.close').classList.remove('disabled');
    } else if (data.status === 'closed') {
        document.querySelector('#solDetail').innerText = data.solutionDetail;
        document.querySelector('.respond').classList.add('disabled');
        document.querySelector('.close').classList.add('disabled');
    }


    if (data.status === 'closed') {
        document.querySelector('.info').style.borderColor = 'rgb(0, 255, 0)';
        document.querySelector('#status').style.color = 'rgb(0, 255, 0)';
    } else if (data.respondedTo === true) {
        document.querySelector('.info').style.borderColor = 'rgb(250, 150, 22)';
        document.querySelector('#status').style.color = 'rgb(250, 150, 22)';
    } else {
        document.querySelector('.info').style.borderColor = 'rgb(200, 15, 15)';
        document.querySelector('#status').style.color = 'rgb(200, 15, 15)';
    }

    document.querySelector('.workOrdersMain').classList.add('hidden');
    document.querySelector('.woRequestMain').classList.remove('hidden');
}
function hideWORequestMain() {
    document.querySelector('.workOrdersMain').classList.remove('hidden');
    document.querySelector('.woRequestMain').classList.add('hidden');
    getWorkOrders('open');
}
function addOption(max) {
    let select = document.querySelector('#machNum');
    let optionElements = document.querySelectorAll('#machNum option')
    let value = 1;
    let machNum = 11;
    optionElements.forEach(option => select.removeChild(option));
    while (max > 0) {
        let option = document.createElement('option');
        option.value = value;
        option.innerText = machNum.toString()
        select.appendChild(option);
        value++;
        machNum++;
        max--;
    }
}
function getMachineName(num) {
    switch (Number(num)) {
        case 1:
            return 'SP';
            break;
        case 2:
            return 'BAL';
            break;
        case 3:
            return 'LNR';
            break;
        case 4:
            return 'CP';
            break;
        case 5:
            return 'AB';
            break;
    }
}
function getDepartmentName(num) {
    switch (Number(num)) {
        case 1:
            return 'Dept Lead';
            break;
        case 2:
            return 'Electrician';
            break;
        case 3:
            return 'Machinist';
            break;
        case 4:
            return 'Millwright';
            break;
        case 5:
            return 'Warehouse';
            break;
    }
}
function addWOLiToList(workOrder, list) {
    let li = document.createElement('li');
    li.classList.add('request', 'flex');
    let leftDiv = document.createElement('div');
    leftDiv.classList.add('dept', 'flex');
    let rightDiv = document.createElement('div');
    rightDiv.classList.add('rightSide', 'flex');

    let deptSpan = document.createElement('span'),
        woNumSpan = document.createElement('span'),
        locSpan = document.createElement('span'),
        probSpan = document.createElement('span');

    deptSpan.innerHTML = getDepartmentName(workOrder.reqDept);
    woNumSpan.classList.add('woNum');
    woNumSpan.innerHTML = `WO# ${workOrder.workOrderNum}`;
    locSpan.innerHTML = `${getMachineName(workOrder.mach)} ${workOrder.mod}${workOrder.machNum}`;
    probSpan.innerHTML = workOrder.probDetail;

    if (workOrder.status === 'closed') {
        li.style.backgroundColor = 'rgb(0, 255, 0)';
    } else if (workOrder.respondedTo === true) {
        li.style.backgroundColor = 'rgb(250, 150, 22)';
    } else {
        li.style.backgroundColor = 'rgb(200, 15, 15)'
    }

    leftDiv.appendChild(deptSpan);
    rightDiv.appendChild(woNumSpan);
    rightDiv.appendChild(locSpan);
    rightDiv.appendChild(probSpan);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv)
    list.appendChild(li);

    li.addEventListener('click', getWorkOrderInfo);
}

// SERVER REQUESTS
async function postWorkOder() {
    try {
        let reqEmp = document.querySelector('#name').innerText,
            reqEmpTitle = document.querySelector('#title').innerText,
            mod = document.querySelector('#mod').value,
            mach = document.querySelector('#mach').value,
            machNum = document.querySelector('#machNum').value,
            reqDept = document.querySelector('#reqDept').value,
            probDetail = document.querySelector('#probDetail').value;
        let currDate = new Date();
        let reqDate = `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`;
        let reqTime = `${currDate.getHours()}:${currDate.getMinutes()}`;

        const response = await fetch(`workOrders`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'reqEmp': reqEmp,
                'reqEmpTitle': reqEmpTitle,
                'reqDate': reqDate,
                'reqTime': reqTime,
                'mod': mod,
                'mach': mach,
                'machNum': machNum,
                'reqDept': reqDept,
                'probDetail': probDetail
            })
        })

        const data = await response.json();
        console.log(data);
        location.reload();

    } catch (err) {
        console.log(err)
    }
}
async function getWorkOrderInfo(num) {
    let woNum;
    if (isNaN(num)) {
        woNum = (this.querySelector('.woNum').innerText).slice(4);
    } else {
        woNum = num;
    }
    alert(woNum);
    try {
        const response = await fetch(`getWoInfo/${woNum}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()

        showWoInfo(data);
    } catch (err) {
        console.log(err)
    }

}
async function getWorkOrders(status) {
    let list;
    let openWoUl = document.querySelector('#openedWorkOrders .workOrders');
    let closedWoUl = document.querySelector('#closedWorkOrders .workOrders');
    (status === 'open') ?
        list = openWoUl :
        list = closedWoUl;
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    try {
        const response = await fetch(`workOrders/${status}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();
        data.forEach(workOrder => {
            addWOLiToList(workOrder, list);
        })
    } catch (err) {
        console.log(err)
    }
}
async function respondToWorkOrder() {
    alert('step 1');
    let woNum = document.querySelector('#woNum').innerText;
    let resEmp = document.querySelector('#name').innerText;
    let title = document.querySelector('#title').innerText;
    
    try {
        alert('step 2');
        const response = await fetch(`respondToWorkOder/${woNum}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'resEmp': resEmp,
                'resEmpTitle': title,
            })
        })
        // const data = await response.json();
        alert('step 3');

        getWorkOrderInfo(woNum);
    } catch (err) {
        console.log(err)
    }
}
async function closeWorkOrder() {
    let woNum = document.querySelector('#woNum').innerText;
    let resEmp = document.querySelector('#name').innerText;
    let title = document.querySelector('#title').innerText;
    let solDetail = document.querySelector('#solDetail textarea').value;
    if (solDetail !== '') {
        try {
            const response = await fetch(`closeWorkOrder/${woNum}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'resEmp': resEmp,
                    'resEmpTitle': title,
                    'solDetail': solDetail
                })
            })
            const data = await response.json();
            getWorkOrderInfo(woNum);
        } catch (err) {
            console.log(err)
        }
    } else {
        alert('Please enter the work was done to fix the problem of the work order.');
    }

}
async function deleteWorkOder() {
    let woNum = document.querySelector('#woNum').innerText;
    try {
        const response = await fetch(`deleteWorkOrder/${woNum}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();

        document.querySelector('.back').click();
    } catch (err) {
        console.log(err)
    }
}
