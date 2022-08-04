const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
  element.addEventListener('click', deleteRecommendation)
})

Array.from(thumbText).forEach((element)=>{
  element.addEventListener('click', addLike)
})

async function deleteRecommendation() {
  const mediaType = this.parentNode.childNodes[1].innerText
  const mediaName = this.parentNode.childNodes[3].innerText
  try {
    const response = await fetch('deleteRecommendation', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'mediaType': mediaType,
          'mediaName': mediaName
        })
      })
     const data = await response.json()
    console.log(data)
    location.reload()
  }
  catch(err){
    console.log(err)
  }
}

async function addLike() {
  const mediaType = this.parentNode.childNodes[1].innerText
  const mediaName = this.parentNode.childNodes[3].innerText
  const mediaLikes = Number(this.parentNode.childNodes[5].innerText)
  try {
      const response = await fetch('addLike', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'mediaType': mediaType,
            'mediaName': mediaName,
            'mediaLikes': mediaLikes
          })
        })
       const data = await response.json()
       console.log(data)
      location.reload()
  }
  catch(err){
      console.log(err)
  }
}