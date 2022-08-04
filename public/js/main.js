// let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
// let UPDATED = false;

// // let navButtons = document.querySelectorAll('.navButtons li');
// // document.querySelector('#createWO').addEventListener('click', selectMain);
// // navButtons.forEach(button => button.addEventListener('click', selectMain));
// document.querySelector('#workOrdersInfo').addEventListener('click', getWorkOrders);

// import { getWorkOrders } from 'workOrders.js'
// getWorkOrders();

// // console.log(window)
// // window.onload = getWorkOrders();


// document.querySelector('#mach').addEventListener('change', setMachNums);
// document.querySelector('#mod').addEventListener('change', setMachNums);
// document.querySelector('.respond').addEventListener('click', respondToWorkOrder);
// document.querySelector('.close').addEventListener('click', closeWorkOrder);
// document.querySelector('.delete').addEventListener('click', deleteWorkOder);
// document.querySelector('#woRequest').addEventListener('click', postWorkOder);


// //PUSHER
// var pusher = new Pusher('0badd11ed0483edfa1ed', {
//     cluster: 'us2'
// });

// var channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function (data) {
//     getWorkOrders();
//     if (UPDATED === true) {
//         selectMain('workOrdersMain');
//         UPDATED = false;
//     }
//     document.querySelector('.sort').classList.remove('hidden');
// });

// // NON SERVER FUNCTIONALITY
// function addOption(module, machLimit) {
//     let select = document.querySelector('#machNum');
//     let optionElements = document.querySelectorAll('#machNum option')
//     let value = 1;
//     let machNum = Number(`${module}1`);
//     optionElements.forEach(option => select.removeChild(option));
//     while (machLimit > 0) {
//         let option = document.createElement('option');
//         option.value = value;
//         option.innerText = machNum.toString()
//         select.appendChild(option);
//         value++;
//         machNum++;
//         machLimit--;
//     }
// }
// function addWOLiToList(workOrder, list) {
//     // alert('success')
//     let li = document.createElement('li');
//     li.classList.add('request', 'flex');

//     let deptSpan = document.createElement('span'),
//         woNumSpan = document.createElement('span'),
//         locSpan = document.createElement('span'),
//         probSpan = document.createElement('span'),
//         statusSpan = document.createElement('span');

//     woNumSpan.innerHTML = `WO# ${workOrder.workOrderNum}`;
//     woNumSpan.classList.add('woNum');
//     statusSpan.innerHTML = workOrder.status;
//     deptSpan.innerHTML = getDepartmentName(workOrder.reqDept);
//     locSpan.innerHTML = `${getMachineName(workOrder.mach)} ${workOrder.mod}${workOrder.machNum}`;
//     probSpan.innerHTML = workOrder.probDetail;

//     if (workOrder.status === 'closed') {
//         li.style.color = 'rgb(0, 255, 0)';
//     } else if (workOrder.respondedTo === true) {
//         li.style.color = 'rgb(250, 150, 22)';
//     } else {
//         li.style.color = 'rgb(200, 15, 15)'
//     }

//     li.appendChild(woNumSpan);
//     li.appendChild(statusSpan);
//     li.appendChild(deptSpan);
//     li.appendChild(locSpan);
//     li.appendChild(probSpan);
//     list.appendChild(li);

//     li.addEventListener('click', getWorkOrderInfo);
// }
// function getDepartmentName(num) {
//     switch (Number(num)) {
//         case 1:
//             return 'Dept Lead';
//             break;
//         case 2:
//             return 'Electrician';
//             break;
//         case 3:
//             return 'Machinist';
//             break;
//         case 4:
//             return 'Millwright';
//             break;
//         case 5:
//             return 'Warehouse';
//             break;
//     }
// }
// function getMachineName(num) {
//     switch (Number(num)) {
//         case 1:
//             return 'SP';
//             break;
//         case 2:
//             return 'BAL';
//             break;
//         case 3:
//             return 'LNR';
//             break;
//         case 4:
//             return 'CP';
//             break;
//         case 5:
//             return 'AB';
//             break;
//     }
// }
// function getTime(woTime) {
//     let hour = '';
//     let half,
//         time;
//     for (let i = 0; i < woTime.length; i++) {
//         if (woTime.charAt(i) !== ':')
//             hour += woTime.charAt(i);
//         else
//             break;
//     }
//     if (Number(hour) === 0) {
//         hour = 12;
//         minutes = woTime.slice(-2);
//         half = 'am';
//         time = `${hour}:${minutes}${half}`;
//     } else if (Number(hour) < 12) {
//         half = 'am';
//         time = `${woTime}${half}`;
//     } else {
//         half = 'pm';
//         hour -= 12;
//         minutes = woTime.slice(-2);
//         time = `${hour}:${minutes}${half}`;
//     }
//     return time;
// }
// function hideWORequestMain() {
//     document.querySelector('.workOrdersMain').classList.remove('hidden');
//     document.querySelector('.woRequestMain').classList.add('hidden');
//     getWorkOrders('open');
// }
// function selectMain(className, reload) {
//     if (className !== 'workOrdersMain') {
//         className = this.classList[0];
//     }
//     if (className === 'workOrdersMain' && reload === false) {
//         document.querySelector('.sort').classList.remove('hidden');
//         getWorkOrders();
//     } else if (className !== 'workOrdersMain') {
//         document.querySelector('.sort').classList.add('hidden');
//     }

//     let mainSections = document.querySelectorAll('.main > section');
//     mainSections.forEach(section => section.classList.add('hidden'));
//     document.querySelector(`.main .${className}`).classList.remove('hidden');
// }
// function selectTab() {
//     this.classList.add('selected');
//     if (this === tabs[0]) {
//         tabs[1].classList.remove('selected');
//         document.querySelector('#openedWorkOrders').classList.remove('hidden');
//         document.querySelector('#closedWorkOrders').classList.add('hidden');
//         getWorkOrders('open');
//     } else {
//         tabs[0].classList.remove('selected');
//         document.querySelector('#openedWorkOrders').classList.add('hidden');
//         document.querySelector('#closedWorkOrders').classList.remove('hidden');
//         getWorkOrders('closed');
//     }
// }
// function setMachNums() {
//     let module = Number(document.querySelector('#mod').value);
//     let machine = Number(document.querySelector('#mach').value);
//     let sp = 1,
//         bal = 2,
//         liners = 6,
//         cp = 3,
//         ab = 3;

//     if (module === 1 || module === 3 || module === 4 || module === 7) {
//         bal = 3
//     }
//     if (module === 7) {
//         liners = 1;
//         cp = 1;
//         ab = 1;
//     } else if (module === 5 || module === 6) {
//         liners = 5;
//         cp = 2;
//         ab = 2;
//     }

//     switch (machine) {
//         case 1:
//             addOption(module, sp);
//             break;
//         case 2:
//             addOption(module, bal);
//             break;
//         case 3:
//             addOption(module, liners);
//             break;
//         case 4:
//             addOption(module, cp);
//             break;
//         case 5:
//             addOption(module, ab);
//             break;
//     }
// }
// function showWoInfo(data) {
//     let dept = getDepartmentName(data.reqDept);
//     let machine = getMachineName(data.mach);
//     let reqTime = '',
//         resTime = '';

//     if (document.querySelector('.solDetail').innerHTML !== '') {
//         document.querySelector('.solDetail').innerText = '';
//     }
//     if (data.reqTime !== '') {
//         reqTime = getTime(data.reqTime);
//     }
//     if (data.resTime !== '') {
//         resTime = getTime(data.resTime);
//     }

//     document.querySelector('#woNum').innerText = `${data.workOrderNum}`;
//     document.querySelector('#status').innerText = `${data.status}`;
//     document.querySelector('#department').innerText = `${dept}`;
//     document.querySelector('#location').innerText = `${machine} ${data.mod}${data.machNum}`;
//     document.querySelector('#detail').innerText = data.probDetail;
//     document.querySelector('#reqDate').innerText = data.reqDate;
//     document.querySelector('#reqTime').innerText = reqTime;
//     document.querySelector('#reqBy').innerText = `${data.reqEmp} - ${data.reqEmpTitle}`;
//     document.querySelector('#resEmp').innerText = `${data.resEmp} - ${data.resEmpTitle}`;
//     document.querySelector('#resDate').innerText = data.resDate;
//     document.querySelector('#resTime').innerText = resTime;

//     if (data.status === 'open' && !document.querySelector('.solDetail').firstChild) {
//         let textArea = document.createElement('textarea');
//         textArea.classList.add('solDetailText');
//         document.querySelector('.solDetail').appendChild(textArea);
//         document.querySelector('.respond').classList.remove('disabled');
//         document.querySelector('.close').classList.remove('disabled');
//     } else if (data.status === 'closed') {
//         document.querySelector('.solDetail').innerText = data.solutionDetail;
//         document.querySelector('.respond').classList.add('disabled');
//         document.querySelector('.close').classList.add('disabled');
//     }

//     if (data.status === 'closed') {
//         document.querySelector('.woInfo').style.borderColor = 'rgb(0, 255, 0)';
//         document.querySelector('#status').style.color = 'rgb(0, 255, 0)';
//     } else if (data.respondedTo === true) {
//         document.querySelector('.woInfo').style.borderColor = 'rgb(250, 150, 22)';
//         document.querySelector('#status').style.color = 'rgb(250, 150, 22)';
//         document.querySelector('.respond').classList.add('disabled');
//     } else {
//         document.querySelector('.woInfo').style.borderColor = 'rgb(200, 15, 15)';
//         document.querySelector('#status').style.color = 'rgb(200, 15, 15)';
//     }

//     document.querySelector('.respond').classList.remove('hidden');
//     document.querySelector('.close').classList.remove('hidden');
//     document.querySelector('.delete').classList.remove('hidden');
//     document.querySelector('.woInfo').classList.remove('hidden');
// }

// //USER REQUESTS

// // WORKORDER REQUESTS
// async function alertOfWO() {
//     try {
//         const response = await fetch(`user`, {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//         })
//         const data = await response.json()

//     } catch (err) {
//         console.log(err)
//     }
// }
// async function closeWorkOrder() {
//     let woNum = document.querySelector('#woNum').innerText;
//     let solDetail = document.querySelector('.solDetail textarea').value;
//     if (solDetail !== '') {
//         try {
//             const response = await fetch(`closeWorkOrder/${woNum}`, {
//                 method: 'put',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     'solDetail': solDetail
//                 })
//             })
//             const data = await response.json();
//             alertOfWO();
//             getWorkOrderInfo(woNum);
//         } catch (err) {
//             console.log(err)
//         }
//     } else {
//         alert('Please enter the work that was done under solution detail.');
//     }

// }
// async function deleteWorkOder() {
//     let woNum = document.querySelector('#woNum').innerText;
//     try {
//         const response = await fetch(`deleteWorkOrder/${woNum}`, {
//             method: 'delete',
//             headers: { 'Content-Type': 'application/json' },
//         })
//         const data = await response.json();
//         alertOfWO();
//         UPDATED = true;
//     } catch (err) {
//         console.log(err)
//     }
// }
// async function getWorkOrders() {
//     alert('success')
//     let list = document.querySelector('.workOrders');
//     while (list.firstChild) {
//         list.removeChild(list.firstChild);
//     }
//     try {
        
//         const response = await fetch(`workOrders/loadWorkOrders`, {
//             method: 'get',
//             headers: { 'Content-Type': 'application/json' },
//         })
//         const data = await response.json();
        
//         console.log(data)
//         data.reverse();
//         data.forEach(workOrder => {
//             addWOLiToList(workOrder, list);
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }
// async function getWorkOrderInfo(num) {
//     let requests = document.querySelector('.workOrders').childNodes;
//     requests.forEach(request => request.classList.remove('selected'));
//     let woNum = num;
//     if (isNaN(num)) {
//         woNum = (this.querySelector('.woNum').innerText).slice(4);
//         this.classList.add('selected');
//     } else {
//         woNum = num;
//     }
//     try {
//         const response = await fetch(`getWoInfo/${woNum}`, {
//             method: 'get',
//             headers: { 'Content-Type': 'application/json' },
//         })
//         const data = await response.json()
//         showWoInfo(data);
//     } catch (err) {
//         console.log(err)
//     }
// }
// async function postWorkOder() {
//     try {
//         let reqEmp = document.querySelector('#name').innerText,
//             reqEmpTitle = document.querySelector('#title').innerText,
//             mod = document.querySelector('#mod').value,
//             mach = document.querySelector('#mach').value,
//             machNum = document.querySelector('#machNum').value,
//             reqDept = document.querySelector('#reqDept').value,
//             probDetail = document.querySelector('#probDetail').value;
//         let currDate = new Date();
//         let reqDate = `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`;
//         let reqTime = `${currDate.getHours()}:${currDate.getMinutes()}`;

//         const response = await fetch(`workOrders`, {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 'reqEmp': reqEmp,
//                 'reqEmpTitle': reqEmpTitle,
//                 'reqDate': reqDate,
//                 'reqTime': reqTime,
//                 'mod': mod,
//                 'mach': mach,
//                 'machNum': machNum,
//                 'reqDept': reqDept,
//                 'probDetail': probDetail
//             })
//         })

//         const data = await response.json();
//         alertOfWO();
//         UPDATED = true;
//     } catch (err) {
//         console.log(err)
//     }
// }
// async function respondToWorkOrder() {
//     let woNum = document.querySelector('#woNum').innerText;
//     let resEmp = document.querySelector('#name').innerText;
//     let title = document.querySelector('#title').innerText;
//     let currDate = new Date();
//     let resDate = `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`;
//     let resTime = `${currDate.getHours()}:${currDate.getMinutes()}`;

//     try {
//         const response = await fetch(`respondToWorkOder/${woNum}`, {
//             method: 'put',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 'resEmp': resEmp,
//                 'resEmpTitle': title,
//                 'resDate': resDate,
//                 'resTime': resTime,
//             })
//         })
//         await response.json()
//         alertOfWO();
//         getWorkOrderInfo(woNum);

//     } catch (err) {
//         console.log(err)
//     }
// }