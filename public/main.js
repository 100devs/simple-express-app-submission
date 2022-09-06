const remake = document.querySelector('#remake-button');
const deleteBurritoButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');
const orderNum = document.querySelector('#order-num').textContent;
const deleteIngredient = document.querySelectorAll('.fa-trash');
const removeCurseButton = document.querySelector('#remove-curse');

removeCurseButton.addEventListener('click', _ => {
    
})

remake.addEventListener('click', _ => {
    fetch('/burritoes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNum: orderNum
      })
    })
    .then(res => {
        window.location.assign('/order')
        if (res.ok) return res.json()
      })
  })

deleteBurritoButton.addEventListener('click', _ => {
    //Send request to the server to delete the burrito from database
    fetch('/burritoes', {
        method:'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            orderNum: orderNum
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No order to delete') {
                messageDiv.textContent = 'No order to delete'
            } else {
                messageDiv.textContent = 'Burrito was donated to the local trash panda rescue. Redirecting...'
                //Wait a little for user to read
                setTimeout(function() {window.location.assign('/')},2500)
            }
        })
})

//Add event listeners to all of the trash icons 
for (let i = 0; i < deleteIngredient.length; i++) {
    deleteIngredient[i].addEventListener('click', _ => {
        //Send request to the server to delete one ingredient and update database
        let deleteButtonID = deleteIngredient[i].id;
        let delItem = deleteButtonID.replace(/-/g,' ')
        const trashMessage = document.getElementById(`${deleteButtonID}-message`);
        console.log(`DeleteButtonID: ${deleteButtonID}  delItem: ${delItem}`)
        // deleteButtonID = deleteButtonID;
        // console.log(`DeleteButtonID: ${deleteButtonID}`)
        //TODO: Remove space from ids with multiple words
        fetch('/ingredient', {
            method:'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                orderNum: orderNum,
                ingredient: delItem
            })
        })
            .then(res => {
                if (res.ok) return res.json();
            })
                .then(response => {
                    if (response === 'success') {
                        console.log(`deleted ${deleteIngredient[i].id}`);
                        //window.location.reload();
                    } else {
                        trashMessage.innerHTML = 'Cursed items cannot be removed.';
                        trashMessage.style.display = 'block';
                    }
                })
    })
}