let pickFav = document.querySelectorAll(".fa-heart");

Array.from(pickFav).forEach((x) => {
  x.addEventListener("click", makeFav);
});

async function makeFav() {
  console.log("this is the likes");
  console.log(this.parentNode);
  const imageCheck = this.parentNode.querySelector("img").src;

  try {
    const response = await fetch("/fav", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hdurl: imageCheck,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

let unlike = document.querySelectorAll(".fa-thumbs-down");

Array.from(unlike).map((x) => {
  x.addEventListener("click", removeFav);
});

async function removeFav() {
  // console.log(this.parentNode);
  let remover = this.parentNode.querySelector("img").src;
  // console.log(remover);

  try {
    const response = await fetch("noFav", {
      // can also be POST or PUT
      method: "PUT",

      // what we are sending the server (json)
      headers: { "Content-Type": "application/json" },

      // body of the message being sent this is where we use the fields from mongo to match what we have gotten from the DOM
      body: JSON.stringify({
        jsUrl: remover,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
