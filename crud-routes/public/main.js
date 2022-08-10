const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('sentences', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': 'Darthy',
        'quote': 'I find your lack of faith disturbing.'
      })
    })


    .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
      })
  })