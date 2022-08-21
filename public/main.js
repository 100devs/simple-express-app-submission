/* eslint-env browser */
// main.js

const likeBtn = document.querySelectorAll('.fa-arrow-up')
const unlikeBtn = document.querySelectorAll('.fa-arrow-down')

Array.from(likeBtn).forEach((element)=>{
  element.addEventListener('click', addLike)
})

Array.from(unlikeBtn).forEach((element)=>{
  element.addEventListener('click', removeLike)
})

async function addLike(){
  const itemText = this.parentNode.childNodes[1].innerText
  try{
      const response = await fetch('addLike', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              'itemFromJS': itemText
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}

async function removeLike(){
  const itemText = this.parentNode.childNodes[1].innerText
  try{
      const response = await fetch('removeLike', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              'itemFromJS': itemText
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}