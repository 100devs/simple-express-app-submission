// const checkItem = document.querySelectorAll('.fa-check-square')
const deleteItem = document.querySelectorAll('.del') // creating an event listener 
const list = document.querySelectorAll('.list span')
const todoComplete = document.querySelectorAll('.list span.completed')

// Array.from(checkItem).forEach((element)=>{
//   element.addEventListener('click', checkTask)
// })

Array.from(deleteItem).forEach((element)=>{
    element.addEventListener('click', deleteText)
  })

  Array.from(list).forEach((element)=>{
    element.addEventListener('click', markComplete)
  }) 

  Array.from(todoComplete).forEach((element)=>{
    element.addEventListener('click', undo)
  }) 

  async function deleteText(){
    const iName = this.parentNode.childNodes[1].innerText // going from span to the li and grabbing the text that is there and we choose 1 because the space is 0

  

    // we are doing our fetch below 
    try{ 
      const res = await fetch('deleteText', {  // all the stuff about the fetch we about to make route: deleteText
        method: 'delete',
        headers:{ 'Content-Type': 'application/json'}, // type of info we are sending 
        body: JSON.stringify({ //send a arequest body with our fetch 
          'taskName' : iName,
       
        })
      })
      const data = await res.json()
      console.log(data)
      location.reload() //reloading the page 
    }catch(err){
      console.log(err)
    }
  } 

async function markComplete(){
  const iName = this.parentNode.childNodes[1].innerText
  

  try{
    const res = await fetch('markComplete', {
      method: 'put',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({
        'taskName' : iName,
    
        
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
} 

async function undo(){
  const iName = this.parentNode.childNodes[1].innerText
  

  try{
    const res = await fetch('undo', { //distinguish between the two puts
      method: 'put',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({
        'taskName' : iName,
    
        
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
} 



