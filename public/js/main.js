const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((e) => {
    e.addEventListener('click', deleteIngredient)
})

// async function deleteRecipe(){
//     // how to target the id of the recipe to delete ??

//     try{
//         const response = await fetch (`http://localhost:8000/delete/${id}`, {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 id: id
//             })
//         })
//         const data = await response.json()
//     }catch(error){
//         console.error(error)
//     }
// }

async function deleteIngredient(){
    //how to target the index of the ingredient to delete ??
    
    try{
        const response = await fetch (`http://localhost:8000/deleteIngredient/${index}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                index: index
            })
        })
        const data = await response.json()
    } catch (error) {
        console.error(error)
    }
}