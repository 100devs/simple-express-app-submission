const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')


deleteButton.addEventListener('click', _ => {
    fetch('/quotes',{
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        if (data === 'No quote to delete') {
            messageDiv.textContent = 'No Darth Vadar quote to delete'
        }else{
            window.location.reload()
        }
    })
})