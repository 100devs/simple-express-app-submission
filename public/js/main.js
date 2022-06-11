document.querySelector('#create').addEventListener('click', selectMain);
let tabs = document.querySelectorAll('.tabs a');
tabs.forEach(tab => tab.addEventListener('click', selectTab));
let topNavButtons = document.querySelectorAll('.small a');
topNavButtons.forEach(button => button.addEventListener('click', selectMain));
let navButtons = document.querySelectorAll('.footer li');
navButtons.forEach(button => button.addEventListener('click', selectMain));

document.querySelector('#machine').addEventListener('change', setMachNums);
document.querySelector('#module').addEventListener('change', setMachNums);

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
    document.querySelector(`main .${className}`).classList.remove('hidden');
    navButtons.forEach(button => button.classList.remove('selected'));
    buttons.forEach(button => {
        if (button !== clickedButton) {
            className = button.classList[0];
            document.querySelector(`main .${className}`).classList.add('hidden');
        }
    });
}
function addOption(max) {
    let select = document.querySelector('#machNum');
    let optionElements = document.querySelectorAll('#machNum option')
    let value = 2;
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
