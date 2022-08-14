
import {Car} from './app.js'

const http = new Car()

document.addEventListener('submit', addCarProperty)

function addCarProperty(e){
    e.preventDefault()
const car_name = document.querySelector('#car_name').value;
const car_model = document.querySelector('#car_model').value;
const car_color = document.querySelector('#car_color').value;
const car_number = document.querySelector('#car_number').value;
const owner_name = document.querySelector('#owner_name').value;

if(car_name !== '' && car_model !== null && car_color !==null && car_number !== null && car_name !== null){
    const data = {
        'car_name' : car_name,
        'car_model' : car_model,
        'car_color' : car_color,
        'car_number' : car_number,
        'owner_name' : owner_name
    }
    http.post('/post',data).
then(result => {
  return result
    
}).then(res => {
    if(res='data inserted successfully'){
        location.reload()
    }
}).catch(error => console.log(error))
}
else{
    http.printToBrowser("none of the input shoud be null",'error')
    setTimeout(function() {
        document.querySelector('.error').remove()
    },4000);
}

}


const deleteText = document.querySelectorAll('.fa-trash');

const updateLike = document.querySelectorAll('.fa-thumbs-up');

Array.from(deleteText).forEach(element =>{
    element.addEventListener('click', deleteclickPost)
})

 async function deleteclickPost(e){
  const CarName = e.target.parentNode.childNodes[1].textContent
  try {
    const response =await fetch('/deletepost',{
        method: 'delete',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify({
            'carName':CarName
          })
    })
    const res = await response.json()
    if(res === 'record deleted'){
        http.printToBrowser(res,'success')
        location.reload()
    }
  } catch (error) {
    http.printToBrowser(error,'error')
  }
}

updateLike.forEach(element=> {
    element.addEventListener('click',addUpdate)
})

async function addUpdate(){
    try {
        const carName = this.parentNode.childNodes[1].textContent
    const Likes = Number(this.textContent)
    // console.log(Likes)
    const updatedetails = await fetch('/addUpdate',{
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
            'carName' : carName,
            'likes' : Likes
        })
    })
    const res = await updatedetails.json()
    if(res){
        http.printToBrowser('likes updated','success')
       location.reload()
    }
    } catch (error) {
        console.log(error)
    }
}


