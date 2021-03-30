
const deleteText = document.querySelectorAll('.del')



Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteChampion)
})


async function deleteChampion(){
    const cName = this.parentNode.childNodes[1].innerText
    const cReign = this.parentNode.childNodes[3].innerText

    try{
        const response = await fetch('deleteChampion', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                 'wrestlerNameS':cName,
                 'reignLengthS': cReign
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err){
        console.log(err)
    }
}