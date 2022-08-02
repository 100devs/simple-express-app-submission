const deleteText = document.querySelectorAll('.fa-trash');
const thumbText = document.querySelectorAll('.fa-thumbs-up');
const editText =  document.querySelectorAll(".fa-pencil-alt");

const button = document.getElementById("button")
const parent = document.getElementById("form")

const recipeName = document.getElementById("recipeName")
const ingredients = document.getElementById("0")
let id = 0

document.querySelector("#button").addEventListener("click", addIngredients)
document.querySelector("#deleteButton").addEventListener("click", deleteIngredient)

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRecipe)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

// Array.from(editText).forEach((element) => {
//   element.addEventListener("click", editRecipe)
// })

async function deleteRecipe(){

  let list = this.parentNode.childNodes[7].childNodes
  let arr = []
  console.log(list.length)
  if(list.length > 3){
    for(let i = 1; i < list.length; i+=2){
      arr.push(list[i].innerText)
    }  
  } else {
    arr = list[1].innerText
  }
 
  console.log(arr)

    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteRecipe', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'recipeNameS': sName,
              'ingredientNameS': arr
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){

  console.log(this.parentNode.childNodes)


  let list = this.parentNode.childNodes[7].childNodes
  let arr = []

  if(list.length > 3){
    for(let i = 1; i < list.length; i+=2){
      arr.push(list[i].innerText)
    }  
  } else {
    arr = list[1].innerText
  }
  console.log(break2)

  const sName = this.parentNode.childNodes[1].innerText    
  const tLikes = Number(this.parentNode.childNodes[13].innerText)
    
  try{
        
    const response = await fetch('addOneLike', { 
      method: 'put',  
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        'recipeNameS': sName,
        'ingredientNameS': arr,
        'likesS': tLikes
      })
        
    })
       
    const data = await response.json()
    console.log(data)
    location.reload()

   
  }catch(err){
    console.log(err)
  }
}



function addIngredients(){
  let input = document.createElement("input");
  id++


  input.classList.add("Ingredients");
  input.type = "text"
  input.id = `${id}`
  input.name = "recipeIngredient"
  input.placeholder = "Add Ingredients"
  parent.insertBefore(input, button)

}

function deleteIngredient() {
  let input = document.getElementById(`${id}`)

  if(id == 0) return

  
  input.remove()
  id--
  
}

// function editRecipe(){


//I solved this in my sleep. On button click, change the form action to a different route, change the method to put, then allow the ability to add, modify, or delete parts of the ingredient list. Also change the button to say edit ingredients and disable the edit text on the other recipes. This requires ID functionality to work and for every other functionality to work via ID's instead of the name and content checking

//   const rName = this.parentNode.childNodes[1].innerText
//   const inputIngredients = document.querySelector(".Ingredients")
//   let list = this.parentNode.childNodes[7].childNodes
  
  parent.action

//   let rIngredient = []

//   if(list.length > 3){
//     for(let i = 1; i < list.length; i+=2){
//       rIngredient.push(list[i].innerText)
//     }  
//   } else {
//     rIngredient = list[1].innerText
//     inputIngredients.value = rIngredient
//   }



//   for(let k = 0; k < rIngredient.length; k++){
    
//     if(k == 0){
//       inputIngredients.value = rIngredient[i]
//       inputIngredients.id =`${k}`

//     } else {
//     let input = document.createElement("input")

//     input.classList.add("Ingredients");
//     input.type = "text"
//     input.name = "recipeIngredient"
//     input.id = `${k}`

//     input.placeholder = "Add Ingredients"
//     console.log(rIngredient[k])
//     parent.insertBefore(input, button)
//     input.value = rIngredient[k]
//     }
//   }
 
//   console.log("hit")
//   console.log(rName)

//   recipeName.value = rName

//   i = rIngredient.length


// }