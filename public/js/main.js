const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')


Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})
Array.from(thumbText).forEach((element) => {
    element.addEventListener('click', addLike)
})


async function deleteTask() {
    const tName = this.parentNode.childNodes[1].innerText
    const tDetail = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                'taskName': tName,
                'taskDetail': tDetail
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload()
    }catch(err){
        console.log(err);
    }
}

async function addLike(){
    const tName = this.parentNode.childNodes[1].innerText
    const tDetail = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {"content-type": 'application/json'},
            body: JSON.stringify({
                'taskName': tName,
                'taskDetail': tDetail,
                "likes": tLikes
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload()
    }catch(err) {
        console.log(err);
    }
}