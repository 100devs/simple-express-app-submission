const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    //send PUT request
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
        
    })
    .then(res => {
        if (res.ok) return res.json()
    })
})