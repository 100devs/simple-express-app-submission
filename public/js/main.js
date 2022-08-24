const deleteBtn   = document.querySelectorAll('.fa-trash')
const patientList = document.querySelectorAll('.patient')
const doctorList  = document.querySelectorAll('.doctor')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

const arrayPatients = []
const arrayDoctors = []

for (const value of Object.values(patientList)) {  
    arrayPatients.push(value.innerText)
}
for (const value of Object.values(doctorList)) {  
    arrayDoctors.push(value.innerText)
}

for(let i=0;i<arrayPatients.length;i++){
    if(arrayDoctors.indexOf(arrayPatients[i])>=0) {
        matchPatientDoctor(arrayPatients[i])
        break
    }  
}

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    const itemClass = this.className.split(/\s+/)[2]
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText,
              'dbFromJS': itemClass
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function matchPatientDoctor(specialty){
    //const itemText = this.parentNode.childNodes[1].innerText
     try{
        //sending text to the backend and wait for response, updating database
        const response = await fetch('matchPatientDoctor', {
            //Hard coding the body sent
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': specialty
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
