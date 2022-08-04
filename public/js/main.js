const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deletePlayer);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener("click", addLike);
});

async function deletePlayer() {
  const sName = this.parentNode.childNodes[1].innerText;
  const bName = this.parentNode.childNodes[3].innerText;
  const fName = this.parentNode.childNodes[5].innerText;
  try {
    const response = await fetch("deletePlayer", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullNameS: sName,
        currentTeamS: bName,
        rings: fName,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const sName = this.parentNode.childNodes[1].innerText;
  const bName = this.parentNode.childNodes[3].innerText;
  const fName = this.parentNode.childNodes[5].innerText;
  const tLikes = Number(this.parentNode.childNodes[7].innerText);
  try {
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullNameS: sName,
        currentTeamS: bName,
        rings: fName,
        likesS: tLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
