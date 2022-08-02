const categoryForm = document.getElementById('category-form')
const searchForm = document.getElementById('search-form')

categoryForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const categorySelection = categoryForm.elements['category'].value
    location = `/${categorySelection}`
}) 

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const query = searchForm.elements['query'].value
    location = `/search/${query}`
})