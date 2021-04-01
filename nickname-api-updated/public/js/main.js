const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteName)
})
Array.from(thumbText).forEach((element) => {
  element.addEventListener('click', addLike)
})

async function deleteName(){
  const nName = this.parentNode.childNodes[1].innerText
  const bName = this.parentNode.childNodes[3].innerText
  try{
    const res = await fetch('deleteName', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'nickNameX': nName,
        'birthNameX': bName
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

async function addLike(){
  const nName = this.parentNode.childNodes[1].innerText
  const bName = this.parentNode.childNodes[3].innerText
  const tLikes = Number(this.parentNode.childNodes[5].innerText)

  try{
    const res = await fetch('addOneLike', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'nickNameX': nName,
        'birthNameX': bName,
        'likesX': tLikes
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}
