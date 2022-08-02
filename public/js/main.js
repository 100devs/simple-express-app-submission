const deleteText = document.querySelectorAll('.fa-trash')
const plusText = document.querySelectorAll('.fa-plus-circle')
const minusText = document.querySelectorAll('.fa-minus-circle')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteDeepFreezerItem)
})

Array.from(plusText).forEach((element)=>{
    element.addEventListener('click', plusOne)
})

Array.from(minusText).forEach((element)=>{
    element.addEventListener('click', minusOne)
})

async function deleteDeepFreezerItem(){
    const iTitle = this.parentNode.childNodes[1].innerText
    const expir = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteDeepFreezerItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemTitleS': iTitle,
              'expirationS': expir
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function plusOne(){
    const iTitle = this.parentNode.childNodes[1].innerText
    const expir = this.parentNode.childNodes[3].innerText
    const quant = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('plusOne', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemTitleS': iTitle,
              'expirationS': expir,
              'quantityS': quant
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function minusOne(){
    console.log(this.parentNode.childNodes)
    const iTitle = this.parentNode.childNodes[1].innerText
    const expir = this.parentNode.childNodes[3].innerText
    const quant = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('minusOne', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemTitleS': iTitle,
              'expirationS': expir,
              'quantityS': quant
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}