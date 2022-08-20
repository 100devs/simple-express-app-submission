const deleteBtn = Array.from(document.querySelectorAll(".del"))

for(let button of deleteBtn) {
    button.addEventListener("click", deleteShow)
}

async function deleteShow() {
    const showId = this.parentElement.dataset.id
    try {
        const response = await fetch('log/delete-show', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'showIdFromJSFile': showId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err) {
        console.error(err)
    }
}