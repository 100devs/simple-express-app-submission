const updateButton = document.querySelector("#update-button")
const deleteButton = document.querySelector("#delete-button")

updateButton.addEventListener("click", (_) => {
  // fetch(endPoint, options)
  fetch("/text", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: "Updated",
    }),
  })
    .then((response) => {
      if (response.ok) return response.json()
    })
    .then((response) => {
      window.location.reload(true)
    })
})

deleteButton.addEventListener("click", removeText)

function removeText() {
  fetch("/text", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: "",
  })
    .then((response) => {
      if (response.ok) return response.json()
    })
    .then((data) => {
      window.location.reload()
    })
    .catch((err) => console.error(err))
}