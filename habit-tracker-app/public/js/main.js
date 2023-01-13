let updateBtns = document.querySelectorAll('.update')
let deleteBtns = document.querySelectorAll('.delete')

for (i of updateBtns) {
   i.addEventListener('click', updateHabit)
}

for (i of deleteBtns) {
   i.addEventListener('click', deleteHabit)
}

async function updateHabit() {

   const habitName = this.parentNode.childNodes[1].innerText
   const daysCompleted = Number(this.parentNode.childNodes[3].innerText.split(' ').pop())

   const res = await fetch('/updateHabit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         habit: habitName,
         days: daysCompleted
      })
   })
   const data = await res.json()
   console.log(data)
   location.reload()
}

async function deleteHabit() {
   const habitName = this.parentNode.childNodes[1].innerText

   const res = await fetch('/deleteHabit', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         habit: habitName
      })
   })
   const data = await res.json()
   console.log(data)
   location.reload()
}