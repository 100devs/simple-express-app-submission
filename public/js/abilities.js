const message = document.querySelector("#errorMessage");

const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((element) => {
  element.addEventListener("click", deleteTrait);
});



function deleteTrait() {
  console.log(this.parentNode.childNodes[5].innerText);
  const abilityName = this.parentNode.childNodes[5].innerText.trim();
  // console.log(JSON.stringify({
  //   name: `${name}`
  // }))

  fetch("/traits", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      abilityName: `${abilityName}`,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((reponse) => {
      console.log(reponse);
      if (reponse === "No Spellcasting trait to delete") {
        message.textContent = "No Spellcasting trait to delete";
      } else {
        window.location.reload();
      }
    });
}

// main.js
const update = document.querySelector("#update-button");

update.addEventListener("click", (_) => {
  // Send PUT Request here
  fetch("/traits", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Spellcasting",
      description: "Congrats, you're a magic man.",
      source: "",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response);
    })
    .then((reponse) => {
      window.location.reload(true);
    });
});
