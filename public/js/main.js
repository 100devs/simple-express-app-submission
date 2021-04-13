const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element) =>{
    element.addEventListener('click', deleteCharacter)
})

async function deleteCharacter(){
    const cName = this.parentNode.childNodes[1].innerText
    const tName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteCharacter',{
            method: 'delete',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'charNameS': cName,
                'teamNameS': tName,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}