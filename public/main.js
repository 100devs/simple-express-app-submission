const updateBtn = document.querySelector('#updateBtn')
const deleteBtn = document.querySelector('#deleteBtn')

updateBtn.addEventListener('click', updateEntry)
deleteBtn.addEventListener('click', deleteEntry)

async function updateEntry(){
  try{
    const res = await fetch('updateEntry', {
      method: 'put',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        exercise: document.getElementsByName('exercise')[0].value,
        sets: document.getElementsByName('sets')[0].value,
        reps: document.getElementsByName('reps')[0].value,
        weight: document.getElementsByName('weight')[0].value
      })
    })

    const data = await res.json()
    console.log(data)
    location.reload()
  }
  catch(err){
    console.error(err)
  }
}

async function deleteEntry(){
  const input = document.getElementById('deleteInput')
  try{
    const res = await fetch('deleteEntry', {
      method: 'delete',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        exercise: input.value
      })
    })

    const data = await res.json()
    location.reload()
  }
  catch(err){
    console.error(err)
  }
}