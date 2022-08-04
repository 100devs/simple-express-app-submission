const updateButton = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

updateButton.addEventListener("click", () => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Dean Learner / Thornton Reed",
      quote: "I'd prefer a beer!"
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(res => {
      window.location.reload(true);
    });
});

deleteButton.addEventListener("click", () => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Dean Learner / Thornton Reed"
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(res => {
      if (res === "No quotes to delete!") {
        messageDiv.textContent = "No Dean quotes to delete!";
      }
      else {
        window.location.reload(true);
      }
    });
});