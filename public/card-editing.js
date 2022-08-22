// const update = document.querySelector('#update-button');

// update.addEventListener('click', e => {
//     // fetch('/edit-cards', {
//     //     method: 'put',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({

//     //     })
//     // })
//     e.preventDefault();
//     console.log(e)
// })

const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(e => {
    e.addEventListener('click', deleteACard)
})
function deleteACard(e) {
    let id = e.target.id;
    console.log(id)
    fetch('/edit-cards', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: `${id}`
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => {
            window.location.reload();
        })
}
