const readButton = document.querySelectorAll('fa-book-open-reader')

Array.from(readButton).forEach((element) => {
    element.addEventListener('click', readBook)
})

async function readBook() {
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'bookListItems': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }
}