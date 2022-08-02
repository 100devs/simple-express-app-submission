// Icons
const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

// Delete material from array
Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteMaterial)
})

// Increment add one to material
Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addOne)
})

// Method for deleting
async function deleteMaterial(){
    const brand = this.parentNode.childNodes[1].innerText
    const product = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteMaterial', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'brand': brand,
              'product': product
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// Method for incrementing one
async function addOne(){
    const brand = this.parentNode.childNodes[1].innerText
    const product = this.parentNode.childNodes[3].innerText
    const amount = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOne', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'brand': brand,
              'product': product,
              'amount': amount
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}