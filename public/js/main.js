const deleteText = document.querySelectorAll(".fa-trash");
const upText = document.querySelectorAll(".fa-arrow-up");
const downText = document.querySelectorAll(".fa-arrow-down");

console.log("We are live");

Array.from(upText).forEach((elem) => {
	elem.addEventListener("click", increasePriority);
});

Array.from(downText).forEach((elem) => {
	elem.addEventListener("click", decreasePriority);
});

Array.from(deleteText).forEach((elem) => {
	elem.addEventListener("click", deleteTask);
});

async function deleteTask() {
	console.log("delete works");
	const taskN = this.parentNode.childNodes[1].innerText;
	try {
		const res = await fetch("deleteTask", {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				taskNamee: taskN,
			}),
		});
		const data = await res.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function increasePriority() {
	console.log("Up arrow works");
	const tName = this.parentNode.childNodes[1].innerText;
	const tPrio = Number(this.parentNode.childNodes[3].innerText);
	console.log(tPrio);
	try {
		const res = await fetch("increasePriority", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				taskNamee: tName,
				taskPriorityy: tPrio,
			}),
		});
		const data = await res.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function decreasePriority() {
	console.log("down arrow works");
	const tName = this.parentNode.childNodes[1].innerText;
	const tPrio = Number(this.parentNode.childNodes[3].innerText);
	try {
		const res = await fetch("decreasePriority", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				taskNamee: tName,
				taskPriorityy: tPrio,
			}),
		});
		const data = await res.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}
