const deleteText = document.querySelectorAll('.fa-trash')
const editText = document.querySelectorAll('.fa-edit')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteMed)
})

Array.from(editText).forEach((element)=>{
    element.addEventListener('click', editMed)
    console.log('changed')
})

document.querySelector('button').addEventListener('click',showMed)

async function showMed(){
  const mName = document.getElementById("medName").value;
  console.log('Hi! searching', mName);
    try {
        const response = await fetch ('showMed/' + mName, {
            method: 'get',
            headers: {'Content-type': 'application/json'}
        })
        const data = await response.json()
      console.log(data)


      const outputHolder = document.getElementById("medInformation");
      // TODO: empty outputHolder of existing data

      const name = document.createElement('p');
      name.innerText = data.medName;

      const doseAmt = document.createElement('p');
      doseAmt.innerText = data.doseAmt;

      outputHolder.appendChild(name);
      outputHolder.appendChild(doseAmt);

    }catch(err){
        console.log(err)
    }
}

async function deleteMed(){
    const mName = this.parentNode.childNodes[1].innerText
    const dAmt = this.parentNode.childNodes[3].innerText

    try{
        const response = await fetch('deleteMed', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'medNameS': mName,
              'doseAmtS': dAmt

            })
          })
        const data = await response.json()
        console.log(data)

    }catch(err){
        console.log(err)
    }
}

async function editMed(){

    const mName = this.parentNode.childNodes[1].innerText
    const nDAmt = this.parentNode.childNodes[3].innerText
    const nDFreq = this.parentNode.childNodes[5].innerText
    const nDDay = this.parentNode.childNodes[7].innerText
    // const tconfirm = Number(this.parentNode.childNodes[9].innerText)
    try{
        const response = await fetch('editMed', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'medNameS': mName,
                'newNameS': document.querySelector('input[name="medName"]').value,
                'doseAmtS': nDAmt,
                'nDoseAmtS': document.querySelector('input[name="doseAmt"]').value,
                'doseFreqS': nDFreq,
                'nDFreq': document.querySelector('input[name="doseFreq"]').value,
                'doseDayS': nDDay,
                'nDDay': document.querySelector('input[name="doseDay"]').value
            })
          })
        // const data = await response.json()
        // console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
