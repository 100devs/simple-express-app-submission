const deleteText = document.querySelectorAll(".fa-trash")
const thumbText = document.querySelectorAll('.fa-check')
const itemCompleted= document.querySelectorAll('.item span.completed')
const deleteAll = document.querySelectorAll('.reset')

Array.from(deleteText).forEach((element) =>{
    element.addEventListener('click', deleteItem)
})

Array.from(thumbText).forEach((element) => {
  element.addEventListener('click', completed)
})

Array.from(itemCompleted).forEach((element) =>{
  element.addEventListener('click', notCompleted)
})

Array.from(deleteAll).forEach((element) =>{
  element.addEventListener('click', reset)
}) 

async function deleteItem(){
    const item = this.parentNode.childNodes[1].innerText

    try{
        const response = await fetch('deleteItem' , {
            method:'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'groceryItem': item,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function reset(){
  const item = this.parentNode.childNodes[1].innerText

  try{
      const response = await fetch('reset' , {
          method:'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              'groceryItem': item
          })
      })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}



async function completed(){
  const item = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('itemCompleted', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'groceryItem': item
          })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
      console.log(err)
    }
}

async function notCompleted(){
  const item = this.parentNode.childNodes[1].innerText
  try{
    const response = await fetch('itemNotCompleted', {
      method: 'put',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'groceryItem': item
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}



