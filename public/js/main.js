const deleteText = document.querySelectorAll(".delete");
const thumbText = document.querySelectorAll(".like");
const thumbDnText = document.querySelectorAll(".hate");

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteIdea)
})
Array.from(thumbDnText).forEach((element) => {
	element.addEventListener("click", addhate);
});

Array.from(thumbText).forEach((element) => {
	element.addEventListener("click", addLike);
});

async function deleteIdea() {
	const iD = this.parentNode.parentNode.id;
	try {
		const response = await fetch("deleteIdea", {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				iDS: iD,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

////select by id
async function addLike() {
	const iD = this.parentNode.parentNode.id;
	try {
		const response = await fetch("addOneLike", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				iDS: iD,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function addhate() {
	const iD = this.parentNode.parentNode.id;
	try {
		const response = await fetch("addOneHate", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				iDS: iD,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

// get modal element
const modal = document.getElementById("simpleModal");

//get open modal button
const modalBtn = document.getElementById("openModalBtn");

//get close button
const closeBtn = document.getElementById("closeBtn");

// listen for open click
modalBtn.addEventListener("click", openModal);

// listen for close click
closeBtn.addEventListener("click", closeModal);

//Listen for outside Click
window.addEventListener("click", clickOutSide);

//function to open modal
function openModal() {
	modal.style.display = "block";
}
//function to close modal
function closeModal() {
	modal.style.display = "none";
}
//function to close modal if outside click1
function clickOutSide(e) {
	if (e.target === modal) {
		modal.style.display = "none";
	}
}
