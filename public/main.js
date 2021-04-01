const getBook = document.querySelector('#getBook')
const bookTitle = document.querySelector('#bookTitle')
const bookAuthor = document.querySelector('#bookAuthor')
const bookDescription = document.querySelector('#bookDescription')
const deleteBook = document.querySelector('#deleteBook')

getBook.addEventListener('click', getRandomBook)

deleteBook.addEventListener('click', removeBook)

async function getRandomBook(){
    try {
        const res = await fetch('/api/books')
        const data = await res.json()

        let books = Object.keys(data)
        let rand = Math.floor(Math.random()*books.length)
        
        let book = [books[rand]]
        
        bookTitle.innerText = data[book].title
        bookAuthor.innerText = data[book].author
        bookDescription.innerText = data[book].description
        deleteBook.name = data[book].title
    } catch(err) {
        console.log(err)
    }
}

async function removeBook(){
    const title = deleteBook.name
    try {
        const response = await fetch('deleteBook', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': title
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}