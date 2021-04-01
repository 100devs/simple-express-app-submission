const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePower)
})

async function deletePower(){
    const pName = this.parentNode.childNodes[1].innerText
    const pDescription = this.parentNode.childNodes[3].innerText
    const pDisadvantages = this.parentNode.childNodes[5].innerText
console.log(pDisadvantages)
    try{
        const response = await fetch('deletePower', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'powerName': pName,
              'powerDescription': pDescription,
              'powerDisadvantages': pDisadvantages
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}