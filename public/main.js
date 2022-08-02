const del = document.querySelectorAll('.delete-button')
const readd = document.querySelectorAll(".readd")
const sect = document.querySelector('.books')
const check = document.querySelector('#check')


Array.from(del).forEach(element => {
    element.addEventListener('click', deleteBook)
})

Array.from(readd).forEach(element => {
    element.addEventListener('click', stvalue)
})



async function stvalue() {
    const b_title = this.parentNode.parentNode.childNodes[1].innerText
    const b_author = this.parentNode.parentNode.childNodes[3].innerText
    const b_read = this.parentNode.parentNode.childNodes[5].innerText
    try {
        const res = await fetch('updateBookStatus', {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: b_title,
                author: b_author,
                read: b_read
            })
        })

        const data = await res.json()

        window.location.reload(true)

    } catch (err) {
        console.error(err)
    }
}



async function deleteBook() {
    const b_title = this.parentNode.parentNode.childNodes[1].innerText
    const b_author = this.parentNode.parentNode.childNodes[3].innerText
    const b_read = this.parentNode.parentNode.childNodes[5].innerText

    try {
        const res = await fetch('deleteBooks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: b_title,
                author: b_author,
                read: b_read
            })
        })
        const data = await res.json()

        window.location.reload(true)
    } catch (err) {
        console.log(err)
    }
}