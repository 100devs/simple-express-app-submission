//create a local host varibale that stores username and password to log status of an individual being logged in. 

//if a user is logged in then redirect to profile page upon request of url

const submitbtn = document.querySelector('#submit');
const submitNewUser = document.querySelector('#submitNewUser');

let username;
const data = new FormData();
function gatherForm(){
    data.append('username', document.querySelector('#username').value);
    console.log(data.username);
    username = data.entries
}

console.log(username);

// submitbtn.addEventListener('click', () => {
//     fetch('/users')
//     .then(res => {
//         if(res.ok) console.log( res.json());
//     })
//     .then(response => {
//         console.log(response);
//     })
// })

localStorage.setItem('status', false);


const signIn = document.querySelector(".login").classList;
const createBtn = document.getElementById("createAcc");
const createAcc = document.querySelector(".createAccount").classList;
const signInBtn = document.querySelector('#loginAcc');

createBtn.addEventListener('click', () => {
    signIn.toggle('hidden');
    createAcc.toggle('hidden');
})

signInBtn.addEventListener('click', () => {
    signIn.toggle('hidden');
    createAcc.toggle('hidden');
})




const update = document.getElementById('update-button');
const deleteButton = document.getElementById('delete-button');

update.addEventListener('click', _ => {
    fetch('/plants', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            plant: 'Alocasia Black Velvet'
        })
    })
    .then(res => {
        if(res.ok) return res.json();
    })
    .then(response => {
        console.log(response);
    })
});

deleteButton.addEventListener('click', _ => {
    fetch('/plants', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
    .then(res => {
        if(res.ok) return res.json();
    })
    .then(response => {
        response === 'No plant to delete' ? message.textContent = "no more darth plants" : window.location.reload(true);
    })
    .catch(error => console.error(error));
})
