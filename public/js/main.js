const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteRBCharacter);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener("click", addLike);
});

async function deleteRBCharacter() {
  const fFriendName = this.parentNode.childNodes[1].innerText;
  const fFavoriteColor = this.parentNode.childNodes[3].innerText;
  const fSpriteName = this.parentNode.childNodes[5].innerText;
  const fOtherAnimals = this.parentNode.childNodes[7].innerText;
  try {
    const res = await fetch("deleteCharacter", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        friendNameF: fFriendName,
        favoriteColorF: fFavoriteColor,
        spriteNameF: fSpriteName,
        otherAnimalsF: fOtherAnimals,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const fFriendName = this.parentNode.childNodes[1].innerText;
  const fFavoriteColor = this.parentNode.childNodes[3].innerText;
  const fSpriteName = this.parentNode.childNodes[5].innerText;
  const fOtherAnimals = this.parentNode.childNodes[7].innerText;
  const tLikes = Number(this.parentNode.childNodes[9].innerText);

  try {
    const res = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        friendNameF: fFriendName,
        favoriteColorF: fFavoriteColor,
        spriteNameF: fSpriteName,
        otherAnimalsF: fOtherAnimals,
        likesS: tLikes,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

