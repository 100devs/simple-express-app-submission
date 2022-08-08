const deleteButtons = document.querySelectorAll('.delete')
Array.from(deleteButtons).forEach(x => {
    x.addEventListener('click', deleteThis)
})

const likeButtons = document.querySelectorAll('.likes')
Array.from(likeButtons).forEach( likeButton =>{
    likeButton.addEventListener('click', likeMe)
})

const reveal = document.querySelector('.reveal')
reveal.addEventListener('click', newPage)

// async functions for get and delete
async function newPage(){
    const promise = await fetch('/new',{
        method: 'get',
        redirect: 'follow'
        //headers: {'Content-type': 'text/html'},
    })
    //document.querySelector('form').classList.toggle('hidden')
}

async function likeMe(){
    const idValue = this.parentNode.childNodes[1].textContent
    const likeValue = Number(this.parentNode.childNodes[11].textContent)
    try{
        const promise = await fetch('/put', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                apple: idValue,
                variableForLike : likeValue
            })
        })
        let ressy = await promise.json()
        console.log(ressy)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}

async function deleteThis(){
    const id = this.parentNode.childNodes[1].textContent
    try{
        const response = await fetch('/delete',{
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'apple': id
            })
        })
        const info = await response.json()
        console.log(info)
        location.reload()
    }
    catch(err){
        console.log(err)
    }

   
}