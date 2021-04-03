const trashcan = document.querySelector('.delete');

        trashcan.addEventListener('click', (e) => {
            const endpoint = `/blogs/${trashcan.parentNode.dataset.doc}`;

            fetch(endpoint, {
                method: 'DELETE'
            })
            .then((res) => res.json())
            .then((data) => {
                window.location.href = data.redirect;
            })
            .catch(err => {
                console.log(err)
            })
        })

        console.log('ho')