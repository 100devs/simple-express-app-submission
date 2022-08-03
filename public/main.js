// const update = document.querySelector('#update-button')
// const deleteButton = document.querySelector('#delete-button')
// const messageDiv = document.querySelector('#message')

const loginButtton = document.getElementById('loginButton')
const loginText = document.getElementById('loginText')

if(localStorage.getItem('blog-post-demo-username')) loginText.innerHTML = `You are logged in as ${localStorage.getItem('blog-post-demo-username')}`

loginButtton.addEventListener('click', _ => {
    const username = prompt('Enter your username')
    const password = prompt('Enter your password')
    login(username, password)
})

async function login(username, password){
    const res = await fetch(`/login/${username}&${password}`)
    const data = await res.json()
    console.log(data)
    if(data[1]){
        loginText.innerHTML = `You are logged in as ${data[0]}`
        localStorage.setItem('blog-post-demo-username', data[0])
    }
    else {
        alert('Invalid Login Credentials...')
        if(localStorage.getItem('blog-post-demo-username')){
            localStorage.removeItem('blog-post-demo-username')
            loginText.innerHTML = `You are not logged in`
        }
        logout()
    }
}

async function logout(){
    const res = await fetch(`/logout`)
    const data = await res.json()
    console.log(data)
}

// update.addEventListener('click', _ => {
//     fetch('/quotes', {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Darth Vader',
//             quote: 'Who has the high-ground now dad?!'
//         })
//     })
//         .then(res => {
//             if (res.ok) return res.json()
//         })
//         .then(response => {
//             window.location.reload()
//         })
// })

// deleteButton.addEventListener('click', _ => {
//     fetch('/quotes', {
//         method: 'delete',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Darth Vader'
//         })
//     })
//         .then(res => {
//             if (res.ok) return res.json()
//         })
//         .then(response => {
//             if (response === 'No quote to delete') {
//                 messageDiv.textContent = 'No Darth Vader quote to delete'
//                 setTimeout(_ => {messageDiv.textContent = ''}, 2000)
//             }
//             else window.location.reload()
//         })
// })