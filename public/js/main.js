const ideas = document.querySelector('.ideas')
ideas.addEventListener('click', handleClick)
function handleClick(event){
  let id = event.target.parentNode.getAttribute('data-id')
  console.log(id)
  let method;
  let action;
  let increaseLikes;
  if(event.target.classList.contains('downvote')){
    method = "put"
    action = "updateLikes"
    increaseLikes = false
  }
  if(event.target.classList.contains('upvote')){
    method = "put"
    action = "updateLikes"
    increaseLikes = true
  }
  if(event.target.classList.contains('delete')){
    method = "delete"
    action = "deleteIdea"
  }
  if(method && action){updateIdea()}
  async function updateIdea(){
    try{
        const response = await fetch(action, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id, increaseLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
  }
}