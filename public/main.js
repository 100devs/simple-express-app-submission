
const deleteBtn = document.querySelectorAll('.fa-trash')
const editBtn = document.querySelectorAll('.btn')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(editBtn).forEach((element)=>{
    element.addEventListener('click', editItem)
})


async function deleteItem(){
    console.log(this.parentNode.childNodes)
    const foodN = this.parentNode.childNodes[1].innerText
    const foodS = this.parentNode.childNodes[3].innerText
    const cal = this.parentNode.childNodes[5].innerText
    console.log(foodN, foodS, cal)
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                foodName: foodN, foodSize: foodS, foodCal: cal
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function editItem(){
    const foodN = this.parentNode.childNodes[1].innerText
    const foodS = this.parentNode.childNodes[3].innerText
    const cal = this.parentNode.childNodes[5].innerText
    
    try{
        const response = await fetch('editItem', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                foodName: foodN, foodSize: foodS, foodCal: cal
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}


function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


