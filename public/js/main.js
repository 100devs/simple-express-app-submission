const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteHike);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener("click", addLike);
});

async function deleteHike() {
  const hName = this.parentNode.childNodes[1].innerText;
  const aName = this.parentNode.childNodes[3].innerText;
  try {
    const response = await fetch("deleteHike", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hikingNameS: hName,
        areaS: aName,
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
  const hName = this.parentNode.childNodes[1].innerText;
  const aName = this.parentNode.childNodes[3].innerText;
  const tLikes = Number(this.parentNode.childNodes[5].innerText);
  try {
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hikingNameS: hName,
        areaS: aName,
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

document.querySelector('#frank').addEventListener('click', getFrank)
function getFrank() {
  document.querySelector('#hikingName').innerText = 'Franklin Park'
  document.querySelector("img").src =
    "https://static.rootsrated.com/image/upload/s--HX5uh39U--/t_rr_large_natural/ncqynhuu8sooxuzzumye.jpg";
  document.querySelector("#location").innerText = "Location: Boston MA, Franklin Park";
  document.querySelector("#difficultly").innerText = " Difficultly: Moderate";
  document.querySelector("#length").innerText = "Length: 2.3 Miles";
  document.querySelector("#routeType").innerText = "Route Type: Loop";
  document.querySelector("#description").innerText = "Franklin Park is a 2.3 mile moderately trafficked loop trail located near Dorchester, Massachusetts that features a lake. The trail is rated as moderate and is primarily used for hiking, walking, running, and road biking. Dogs are also able to use this trail";
}

document.querySelector("#carson").addEventListener("click", getcarson);
function getcarson() {
  document.querySelector("#hikingName").innerText = "Carson Beach";
  document.querySelector("img").src =
    "https://upload.wikimedia.org/wikipedia/commons/1/16/Carson_Beach%2C_South_Boston.jpg";
  document.querySelector("#location").innerText =
    "Location: Carson Beach, Boston, MA";
  document.querySelector("#difficultly").innerText = " Difficultly: Easy";
  document.querySelector("#length").innerText = "Length: 3.1 Miles";
  document.querySelector("#routeType").innerText = "Route Type: Out & Back";
  document.querySelector("#description").innerText =
    "Carson Beach via Boston Harbor Walk is a 3.1 mile lightly trafficked out and back trail located near South Boston Naval Annex, Massachusetts that offers scenic views and is good for all skill levels. The trail is primarily used for walking, running, and road biking. Dogs are also able to use this trail but must be kept on a leash.";
}

document.querySelector("#melnea").addEventListener("click", getmelnea);
function getmelnea() {
  document.querySelector("#hikingName").innerText = "Melnea Cass Bike Path";
  document.querySelector("img").src =
    "http://www.masspaths.net/photos/sbht2006/IMG_0020.JPG";
  document.querySelector("#location").innerText =
    "Location: Melnea Cass Bike Path, Boston, MA";
  document.querySelector("#difficultly").innerText = " Difficultly: Easy";
  document.querySelector("#length").innerText = "Length: 1.9 Miles";
  document.querySelector("#routeType").innerText = "Route Type: Out & Back";
  document.querySelector("#description").innerText =
    "Melnea Cass Bike Path is a 1.9 mile out and back trail located near Boston, Massachusetts and is good for all skill levels. The trail is primarily used for walking, running, and road biking";
}

document.querySelector("#kids").addEventListener("click", getkids);
function getkids() {
  document.querySelector("#hikingName").innerText = "Downtown Boston Kids Walk";
  document.querySelector("img").src =
    "https://redtri.com/wp-content/uploads/2020/11/Downtown-Boston-Kids-Walk.jpg?w=605";
  document.querySelector("#location").innerText =
    "Location: Belvidere Parking Garage, Boston, MA";
  document.querySelector("#difficultly").innerText = " Difficultly: Easy";
  document.querySelector("#length").innerText = "Length: 1.7 Miles";
  document.querySelector("#routeType").innerText = "Route Type: Point to Point";
  document.querySelector("#description").innerText =
    "Downtown Boston Kids Walk is a 1.7 mile moderately trafficked point to point trail located near Boston, Massachusetts that features beautiful wild flowers and is good for all skill levels. The trail is primarily used for walking, nature trips, and bird watching and is best used from March until October. Dogs are also able to use this trail but must be kept on a leash.";
}