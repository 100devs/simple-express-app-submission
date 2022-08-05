
const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {

    fetch(`/edit/${deleteButton.dataset.doc}`, {
        method: 'delete',
        
    })
    .then(response => response.json())
    //If no no entries to delete
    .then(data => console.log(data))
    .catch(err => console.log(err))
})
