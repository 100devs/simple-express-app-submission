const deleteBtn = document.querySelectorAll('.fa-trash')
console.log("main connected")

deleteBtn.forEach((e) => {
    e.addEventListener("click", deletePost)
  })
  

async function deletePost(){ 
    const itemText = this.parentNode.childNodes[1].innerText 
    console.log(itemText)
    try{ 
        console.log(itemText)

        const response = await fetch('deletePost', { 
            method: 'delete', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
              'postS': itemText 
            })
          })
        const data = await response.json() 
        console.log(data) 
        location.reload() 

    }catch(err){  
        console.log(err)
    }
}


//  update like count 

const likeBtn = document.querySelectorAll(".fa-thumbs-up")

likeBtn.forEach(e => {
  e.addEventListener("click", addLike)
})

async function addLike(){
  const itemText = this.parentNode.childNodes[1].innerText 
  const tLikes = Number(this.parentNode.childNodes[5].innerText)
  try{
    console.log(tLikes)
      const response = await fetch('addOneLike', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'postS': itemText ,
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