document.querySelector('#mach').addEventListener('change', setMachNums);
document.querySelector('#mod').addEventListener('change', setMachNums);
document.querySelector('#woRequest').addEventListener('click', postWorkOder);

function addOption(module, machLimit) {
    let select = document.querySelector('#machNum');
    let optionElements = document.querySelectorAll('#machNum option')
    let value = 1;
    let machNum = Number(`${module}1`);
    optionElements.forEach(option => select.removeChild(option));
    while (machLimit > 0) {
        let option = document.createElement('option');
        option.value = value;
        option.innerText = machNum.toString()
        select.appendChild(option);
        value++;
        machNum++;
        machLimit--;
    }
}

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
            addOption(module, sp);
            break;
        case 2:
            addOption(module, bal);
            break;
        case 3:
            addOption(module, liners);
            break;
        case 4:
            addOption(module, cp);
            break;
        case 5:
            addOption(module, ab);
            break;
    }
}

async function alertOfWO() {
    const temp = 'hello world';
    const info = { message: temp }
    try {
        const response = await fetch(`submitWO`, {
            method: 'post',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        // alert('true')
        document.querySelector('#workOrdersInfo').click();
    } catch (err) {
        console.log(err)
    }
}

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

        const response = await fetch(`workOrders/postWorkOrder`, {
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
        alertOfWO();
    } catch (err) {
        console.log(err)
    }
}