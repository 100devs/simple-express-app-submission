const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
//const itemCompleted = document.querySelectorAll('.item span.completed')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteColor)
})
Array.from(item).forEach((element)=>{
    element.addEventListener('click',changeBG)
})

async function deleteColor(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteColor',{
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function changeBG(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('changeBG',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

console.log('📶📶📶')//connected to index.ejs, successfull