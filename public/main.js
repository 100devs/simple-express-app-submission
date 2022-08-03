//Temporarily changed all event listeners to disable functionality.

// ========================
// Delete Player
// ========================

const trash = document.querySelectorAll('.trash');
Array.from(trash).forEach(element => {
	element.addEventListener('click', disable) // deletePlayer
});

async function deletePlayer() {
	if (confirm('Are you sure?')) {
		const pName = this.parentNode.childNodes[5].innerText;
		const fName = this.parentNode.childNodes[3].innerText;
		try {
			const response = await fetch('/deletePlayer', {
				method: 'delete',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					'playerNameS': pName,
					'farmNameS': fName,
				}),
			});
			const data = await response.json();
			console.log(data);
			location.reload();
		} catch (err) {
			console.log(err);
		}
	}
}

// ========================
// Game Functionality
// ========================

document.querySelector('#byNumber').addEventListener('click', disable) // byNumber
document.querySelector('#barn').addEventListener('click', disable) // barn
document.querySelector('#marry').addEventListener('click', disable) // marry
document.querySelector('#kill').addEventListener('click', disable) // kill

function getRadioValue(name) {
	let ele = document.getElementsByName(name);
	let result
	ele.forEach(e => e.checked ? result = e.value : null)
	if (result) {
		return result
	} else {
		if (name === 'radioPlayer') {
			alert('No player selected.')
		} else {
			alert('No animal selected.')
		}
	}
}

async function byNumber() {
	const pName = getRadioValue('radioPlayer')
	const animal = getRadioValue('radioAnimal')
	const number = Number(document.querySelector('#number').value)
	if (!number) {
		alert('Please enter a number.')
	} else {
		try {
			const response = await fetch('byNumber', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					'playerNameS': pName,
					'animalS': animal,
					'numberS': number
				})
			})
			const data = await response.json()

			console.log(data)
			location.reload()

		} catch (err) {
			console.log(err)
		}
	}
}
async function barn() {
	const pName = getRadioValue('radioPlayer')
	const animal = getRadioValue('radioAnimal')

	try {
		const response = await fetch('barn', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'playerNameS': pName,
				'animalS': animal,
				'numberS': number
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}
async function marry() {
	const pName = getRadioValue('radioPlayer')
	const animal = getRadioValue('radioAnimal')

	try {
		const response = await fetch('marry', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'playerNameS': pName,
				'animalS': animal,
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}
async function kill() {
	const pName = getRadioValue('radioPlayer')
	const animal = getRadioValue('radioAnimal')

	try {
		const response = await fetch('kill', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'playerNameS': pName,
				'animalS': animal,
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}

// ===================================
// Temporarily Disabling Functionality
// ===================================

document.querySelector('#create').addEventListener('click', disable)

function disable() {
	alert('You do not have permission to do that.')
}