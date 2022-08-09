
const deleteBtn = document.querySelectorAll('.fa-trash')
const editBtn = document.querySelectorAll('.fa-pen-to-square')

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
    
    let info = {
                foodname: this.parentNode.childNodes[1].innerText, 
                foodsize: this.parentNode.childNodes[3].innerText, 
                calories: this.parentNode.childNodes[5].innerText,
                id: this.parentNode.childNodes[7].title,
                }

    try{
        const response = await fetch('/updateItem', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( info )
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }

}


   
