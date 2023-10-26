const deleteText = document.querySelectorAll('.fa-trash');
Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRecipe);
})
async function deleteRecipe(){
    const rName = this.parentNode.childNodes[1].innerText;
    const ingredients = this.parentNode.childNodes[3].innerText;
    const instructions = this.parentNode.childNodes[5].innerText;
    try{
        const response = await fetch('deleteRecipe', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'recipeName': rName,
                'ingredients': ingredients,
                'instructions': instructions,
            })
          })
        const data = await response.json();
        console.log(data);
        location.reload();
    }catch(err){
        console.log(err)
    }
}

const editText = document.querySelectorAll('.edit-recipe');
Array.from(editText).forEach((element)=>{
    element.addEventListener('click', editRecipe);
});

async function editRecipe(){
    document.getElementById('addRecipe').classList.add('hidden')
    document.getElementById('editForm').classList.remove('hidden')
    //document.getElementById('addRecipe').style.display = 'none';
    const recipeId = this.parentNode.getAttribute('data-recipe-id');
    const rName = this.parentNode.querySelector('.recipe-name').innerText;
    const ingredients = this.parentNode.querySelector('.recipe-ingredients').innerText;
    const instructions = this.parentNode.querySelector('.recipe-instructions').innerText;


    submitForm();
}

const submitForm  = async function () {



    try{
        const response = await fetch(`/editRecipe/${recipeId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': recipeId,
              'recipeName': rName,
              'ingredients': ingredients,
              'instructions': instructions,
            })
          })
        const data = await response.json();
        location.reload();
        //document.getElementById('editForm').classList.add('hidden');
        //document.getElementById('addRecipe').classList.remove('hidden')
        console.log(data);
    
    }catch(err){
        console.log(err);
    }
    
}