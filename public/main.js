const update = document.querySelector('#update-button')

const deleteButton = document.querySelector('#delete-button')

const iceKingQuotes = [
  'Fool! Your powers are no match for my magical crown!',
  'Ladies! I brought you a baby, and a puppy!',
  "Play it or I'll squish you into juice!"
];

const randomQuote = iceKingQuotes[Math.floor(Math.random()*iceKingQuotes.length)];

update.addEventListener('click', _ => {
    // Send PUT Request here
  })

  update.addEventListener('click', (_) => {
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ice King',
        quote: `${randomQuote}`
      })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
  })

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ice King'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Ice King quote to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })
