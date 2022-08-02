const displayButton = document.querySelector(".display-button");
displayButton.addEventListener("click", displayCharacter);

function displayCharacter() {
  fetch("/character/Veteran")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// document.querySelector(".getData").addEventListener("click", clickFetch);
// document
//   .querySelector(".logStorage")
//   .addEventListener("click", ConsoleLogStorage);
// document.querySelector(".displayData").addEventListener("click", updateDisplay);

// function clickFetch() {
//   fetch("/js/liana.json")
//     .then((res) => res.json()) // parse response as JSON
//     .then((data) => {
//       localStorage.setItem("liana", JSON.stringify(data));
//       //console.log(localStorage.getItem("liana"));
//     }).then(() => {
//       ConsoleLogStorage();

//     })
//     .catch((err) => {
//       console.log(`error ${err}`);
//     });
// }
// function ConsoleLogStorage() {
//   console.log(JSON.parse(localStorage.getItem("liana")));
//   const data = JSON.parse(localStorage.getItem("liana"));
//   updateDisplay(data);
// }

// function updateDisplay(data) {
//   let nameVar = document.querySelector(".name");
//   let picture = document.querySelector(".charImg");
//   const abilities = document.querySelector(".abilities");
//   console.log(data);
//   nameVar.innerHTML = data.name;
//   picture.src = data.img;
//   picture.width = "500";
//   picture.height = "500";

//   // console.log(data.data.abilities.str.value);
//   // console.log(abilities.querySelector(".str").innerHTML);
//   // abilities.querySelector(
//   //   `.str`
//   // ).innerHTML = `Strength: ${data.data.abilities.str.value}`;

//   const abilityList = Object.keys(data.data.abilities);

//   console.log(abilityList);
//   for (const key of abilityList) {
//     console.log(abilities.querySelector(`.${key}`).innerHTML);
//     abilities.querySelector(`.${key}`).innerHTML = `${key.toUpperCase()}: ${data.data.abilities[key].value
//       }`;
//   }
// }

// /*

// let guns = ["light", "shells", "heavy", "rifle"];
//         function getGuns(arr) {
//             return arr[Math.floor(Math.random() * 4)]
//         }
//         console.log("Beth gets:", getGuns(guns));
//         console.log("Tom gets:", getGuns(guns));
//         console.log("Ryan gets:", getGuns(guns));

//         */
