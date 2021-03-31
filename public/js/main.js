const deleteButtons = document.querySelectorAll('#list-film-ratings .button-delete-film');
const filmList = document.querySelector('#list-film-ratings');


deleteButtons.forEach(button => {
	button.addEventListener('click', deleteFilm);
});


async function deleteFilm(event) {
	event.preventDefault();

	const film = event.currentTarget.dataset.key;

	try {
		const request = await fetch(`/api/deletefilm`, {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				film: film
			})
		});

		if(request.ok) {
			window.location.reload();
		}
		else {
			throw new Error('Could not reach the server');
		}
	}
	catch(error) {
		console.error(error);
		filmList.textContent = 'Something went wrong. Please refresh the page';
	}
}