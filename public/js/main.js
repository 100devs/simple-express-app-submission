const deleteText = document.querySelectorAll(".fa-trash");
const arrowText = document.querySelectorAll(".fa-arrow-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteDrink);
});

Array.from(arrowText).forEach((element) => {
  element.addEventListener("click", addUnit);
});

async function deleteDrink() {
  const name = this.parentNode.childNodes[1].innerText;
  const type = this.parentNode.childNodes[3].innerText;
  const size = this.parentNode.childNodes[3].innerText;
  try {
    const response = await fetch("deleteDrink", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameS: name,
        typeS: type,
        sizeS: size,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addUnit() {
  const name = this.parentNode.childNodes[1].innerText;
  const type = this.parentNode.childNodes[3].innerText;
  const size = this.parentNode.childNodes[5].innerText;
  const tUnits = Number(this.parentNode.childNodes[7].innerText);
  try {
    const response = await fetch("addOneUnit", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameS: name,
        typeS: type,
        sizeS: size,
        unitsS: tUnits,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
