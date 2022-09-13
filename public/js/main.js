const deleteBtn = document.querySelectorAll(".fa-trash");

Array.from(deleteBtn).forEach((el) => {
	el.addEventListener("click", deleteEntry);
});

async function deleteEntry() {
	const entryText = this.parentNode.childNodes[1].innerText;
	try {
		const response = await fetch("deleteEntry", {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"entryFromJS": entryText,
			}),
		});

		const data = await response.json();

		console.log(data);
		location.reload();
	} catch (err) {
		throw new Error({ "error": err });
	}
}
