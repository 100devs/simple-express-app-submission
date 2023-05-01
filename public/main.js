const updateButton = document.querySelector("#update-button")
const deleteButton = document.querySelector("#delete-button")

updateButton.addEventListener("click", (_) => {
  // fetch(endPoint, options)
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "MisterMyGuy",
      quote: "THIS IS A QUOTE",
    }),
  })
    .then((response) => {
      if (response.ok) return response.json()
    })
    .then((response) => {
      window.location.reload(true)
    })
})

deleteButton.addEventListener('click', removeQuote)

function removeQuote() {
    fetch('/quotes',
        {
            method: delete,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'MisterMyGuy'
            })
        }
    )
    .then(response => {
        if(response.ok) return response.json()
    })
    then(data => {
        window.location.reload()
    })
    .catch(err => console.error(err))
}