const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
// 
const form = document.querySelector('form');
const closeForm = document.querySelector('.closeForm');
const openForm = document.querySelector('.openForm');
// js for form toggle
openForm.addEventListener('click',show);
closeForm.addEventListener('click',toggle);

function show(){
    form.style.top = '0';
    form.style.height = '100%';
    closeForm.style.display = 'block';
    openForm.style.display = 'none';
}
function toggle(){
    form.style.top = '90%';
    closeForm.style.display = 'none';
    openForm.style.display = 'block';
}

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteNote)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteNote(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteNote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'authorNameS': sName,
              'quoteContentS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'authorNameS': sName,
              'quoteContentS': bName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}