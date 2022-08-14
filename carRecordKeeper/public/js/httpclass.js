class Car{



    async post(url,data){
        try {
            const postdata = await fetch(url,{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({data})
            })
            const response = await postdata.json();
            return response;
        } catch (error) {
           return error
        }
     
    }
}


document.addEventListener('submit', addCarProperty)

function addCarProperty(e){
const car_name = document.querySelector('#car_name').value;
const car_model = document.querySelector('#car_model').value;
const car_color = document.querySelector('#car_color').value;
const car_number = document.querySelector('#car_number').value;
const owner_name = document.querySelector('#owner_name').value;
    e.preventDefault();

 
if(car_name !== '' &  car_model !=='' & car_color !== null & car_number !=='' & owner_name !== ''){

    http = new Car()
const data ={
    'car_name' : car_name,
    'car_model':car_model,
    'car_color' : car_color,
    'car_number':car_number,
    'owner_name':owner_name
}
http.post('/addpost',data).then(result=> {
    if(result.ok){
        location.reload();
    }
}).catch(error => console.log(error))
}
else{
    alert('you cant enter until you key in your car details')
}

document.querySelector('#car_name').value = '';
}

    async function getrecords(){
        try {
            const getpost = await fetch('/addpost',{
                method: "GET",
                headers: {"Content-Type" : "application/json"}
            });
            const response = await getpost.json()
            console.log(response);
        } catch (error) {
            console.log(error)
        }
        
    }
    getrecords();


// const getpost = new Addcar();
// const getresponse = getpost.get('/');

// getresponse.then(result => console.log(result)).catch(error => console.log(error))
