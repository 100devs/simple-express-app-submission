document.querySelector('#create').addEventListener('click', selectMain);
let tabs = document.querySelectorAll('.tabs a');
tabs.forEach(tab => tab.addEventListener('click', selectTab));
let topNavButtons = document.querySelectorAll('.small a');
topNavButtons.forEach(button => button.addEventListener('click', selectMain));
let navButtons = document.querySelectorAll('.footer li');
navButtons.forEach(button => button.addEventListener('click', selectMain));
let workOrders = document.querySelectorAll('.workOrders li');
workOrders.forEach(button => button.addEventListener('click', showWORequestMain));

document.querySelector('#machine').addEventListener('change', setMachNums);
document.querySelector('#module').addEventListener('change', setMachNums);
document.querySelector('.back').addEventListener('click', hideWORequestMain)
document.querySelector('.close').addEventListener('click', closeWorkOrder);

function setMachNums() {
    let module = Number(document.querySelector('#module').value);
    let machine = Number(document.querySelector('#machine').value);
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
        document.querySelector('#pastDetails').classList.remove('hidden');
        document.querySelector('#detailNotes').classList.add('hidden');
    } else {
        tabs[0].classList.remove('selected');
        document.querySelector('#pastDetails').classList.add('hidden');
        document.querySelector('#detailNotes').classList.remove('hidden');
    }
}
function selectMain() {
    let className = this.classList[0];
    hideMain(navButtons, this, className);
    hideMain(topNavButtons, this, className);
    if (!this.classList.contains('topNavButtons')) {
        document.querySelector(`footer .${className}`).classList.add('selected');
    }
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
async function showWORequestMain(num) {
    let woNum;
    if (isNaN(num)) {
        woNum = (this.querySelector('.woNum').innerText).slice(4);
    } else {
        woNum = num;
    }
    try {
        const response = await fetch(`getWoInfo/${woNum}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();
        // console.log(data);

        let respondingEmployee,
            solDetail;
        let dept = getDepartmentName(data.shop);
        let machine = getMachineName(data.mach);
        (data.resEmp === 'unknown') ?
            respondingEmployee = 'No one responding yet' :
            respondingEmployee = data.resEmp;

        (data.solutionDetail === '') ?
            solDetail = 'Work Order Still Open' :
            solDetail = data.solutionDetail

        document.querySelector('#woNum').innerText = data.workOrderNum;
        document.querySelector('#status').innerText = data.status;
        document.querySelector('#reqDept').innerText = dept;
        document.querySelector('#location').innerText = `${machine} ${data.mod}${data.machNum}`;
        document.querySelector('#problemDetail').innerText = data.problemDetail;
        document.querySelector('#reqBy').innerText = 'Danielle Rader';
        document.querySelector('#resEmp').innerText = respondingEmployee;
        document.querySelector('#solDetail').innerText = solDetail;
    } catch (err) {
        console.log(err)
    }
    document.querySelector('.workOrdersMain').classList.add('hidden');
    document.querySelector('.woRequestMain').classList.remove('hidden');
}

function hideWORequestMain() {
    document.querySelector('.workOrdersMain').classList.remove('hidden');
    document.querySelector('.woRequestMain').classList.add('hidden');
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

function getDepartmentName(num) {
    switch (Number(num)) {
        case 1:
            return 'Lead';
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
            return 'Fork Lift';
            break;
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

async function closeWorkOrder() {
    let woNum = document.querySelector('#woNum').innerText;
    let resEmp = document.querySelector('#name').innerText;
    let title = document.querySelector('#title').innerText;
    try {
        const response = await fetch(`closeWorkOrder/${woNum}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'resEmp': resEmp,
                'resEmpTitle': title
            })
        })
        const data = await response.json();
        console.log(data);

    showWORequestMain(woNum);
    } catch {
        console.log(err)
    }
}
