console.log("Present!");
const drawButton = document.querySelector("#draw-button");
const resetButton = document.querySelector("#reset-button");
const defaultsButton = document.querySelector("#default-button");
const defaultInput = document.querySelector(".default-input");
const addRemainingButton = document.querySelector("#add-remaining");
const addRemainingInput = document.querySelector(".add-remaining-input");
const name = document.querySelector(".name");
const days = document.querySelector(".days");
const remainingItems = document.querySelector(".remaining-items");
const lastDraw = document.querySelector(".last-draw");
const userInfoList = document.querySelector(".user-info");

let stopRepeat = false;
console.log(drawButton);
drawButton.addEventListener("click", async (e) => {
  const data = { user: name.textContent };
  const res = await fetch("/draw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  if (user.error) {
    if (!stopRepeat) {
      const h1 = document.createElement("h1");
      h1.appendChild(document.createTextNode(user.error));
      userInfoList.appendChild(h1);
      stopRepeat = true;
    }
  } else {
    console.log(user.remainingOptions);
    lastDraw.textContent = user.lastDraw;
    days.innerHTML = user.remainingDays;
    console.log(remainingItems.text);
    remainingItems.textContent = `Remaining items: ${user.remainingOptions.join(
      ", "
    )}`;
  }
});
resetButton.addEventListener("click", async (e) => {
  const data = { user: name.textContent };
  const res = await fetch("/reset", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    location.reload();
  }
});
defaultsButton.addEventListener("click", async (e) => {
  const input = defaultInput.value;
  console.log(input);
  const inputArr = input
    .split(",")
    .map((str) => str.trim())
    .filter((str) => str !== "");
  console.log(inputArr);

  const data = { user: name.textContent, newDefaults: inputArr };
  const res = await fetch("/replaceDefaults", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    location.reload();
  }
});
addRemainingButton.addEventListener("click", async (e) => {
  const input = addRemainingInput.value;
  console.log(input);
  const inputArr = input
    .split(",")
    .map((str) => str.trim())
    .filter((str) => str !== "");
  console.log(inputArr);

  const data = { user: name.textContent, items: inputArr };
  const res = await fetch("/addOptions", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    location.reload();
  }
});
