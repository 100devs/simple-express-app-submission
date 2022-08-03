const deleteText = document.querySelectorAll('.fa-trash')
const watchText = document.querySelectorAll('.fa-eye')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteMovie)
})

Array.from(watchText).forEach((element)=>{
    element.addEventListener('click', watchedMovie)
})

async function deleteMovie(){
    const movieName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': movieName,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function watchedMovie(){
    const movieName = this.parentNode.childNodes[1].innerText
    const watched = false
    try{
        const response = await fetch('addToWatched', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': movieName,
              'watched': watched,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err);
    }
};