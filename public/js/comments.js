const deleteText = document.querySelectorAll('.delete')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteServant)
})


async function deleteServant(){
  const info = this.parentNode.childNodes
  const stats = this.parentNode.parentNode.parentNode.childNodes
    try{
      const response = await fetch('deleteComment', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'comments' : stats[3].innerText,
            'likes' : info[5].innerText
          })
        })
      const data = await response.json()
      location.reload()

  }catch(err){
      console.log(err)
  }
}


const thumbText = document.querySelectorAll('.like')


Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function addLike(){

  const info = this.parentNode.childNodes
  const stats = this.parentNode.parentNode.parentNode.childNodes


  const comments = stats[3].innerText
  const commentLikes = info[7].innerText
  console.log(info[7].innerText)

        try{
            const response = await fetch('addCommentLike', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  'comments' : comments,
                  'commentLikes' : commentLikes
                })
              })
            const data = await response.json()
            console.log(data)
            location.reload()
    
        }catch(err){
            console.log(err)
        }
    }