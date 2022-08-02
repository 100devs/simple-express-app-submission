const update = document.querySelector("#update-button")
const deleteButton = document.querySelector("#delete-button")
const message = document.querySelector("#message")

//TODO: change body to form data
update.addEventListener("click", _ =>{
    fetch("/songs", {
        method: "put",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            band: "Fall Out Boy",
            song: "Grand Theft Autumn"
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log(response)
            window.location.reload(true)
        })
})

//TODO: change body to form data
deleteButton.addEventListener("click", _ => {
    fetch("/songs", {
        method: "delete",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            band: " "
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if(response === "No empty data to delete"){
                message.textContent = "No empty data to delete"
            } else {
                window.location.reload(true)
            }
        })
        .catch(err => console.error(err))
})
