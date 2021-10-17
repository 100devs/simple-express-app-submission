//main.js
const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#messageDiv');

update.addEventListener('click', (_) => {
  fetch('/info', {
    method: 'put',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: 'The Killers',
      year: '2001',
      location: 'Las Vegas, NV., USA',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});

deleteButton.addEventListener('click', (_) => {
  fetch('/info', {
    method: 'delete',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: 'The Killers',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === `No info to delete`) {
        messageDiv.textContent = `No info on The Killers to delete`;
      } else {
        window.location.reload(true);
      }
    })
    .catch(console.error);
});
