const recipes = document.querySelector('.recipe-list')


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


recipes.addEventListener('click', async (e) => {
    // Select the child h3 element of the clicked element. This contains the recipe name.
    const recipeName = e.target.parentElement.querySelector('h3').innerText
    let requestMethod = 'GET'

    if (e.target.classList.contains('edit')) {
        requestMethod = 'PUT'
    }
    if (e.target.classList.contains('delete')) {
        requestMethod = 'DELETE'
    }

    // Send PUT request to update the post with new data
    const response = await fetch('/recipes', {
        method: requestMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name: recipeName,
            ingredients: 'successfully edited ingredients',
            instructions: 'successfully edited ingredients'
        })
    })

    if (response.ok) {
        const updatedRecipe = await response.json()
        console.log(`Updated recipe with ${requestMethod} request!`)
        console.log(updatedRecipe)
        wait(1000).then(() => window.location.reload())
    }
})