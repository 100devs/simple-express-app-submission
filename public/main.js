const update = document.querySelector("#update-button")

update.addEventListener("click", (_) => {
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
