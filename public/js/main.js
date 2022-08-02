const deleteBtn = document.querySelectorAll('.fa-trash');
document.querySelector('#retrieveBtn').addEventListener('click', retrieveStock);

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem);
})

async function retrieveStock(){
	const stock = document.querySelector("#stockName").value;  
	const res = await fetch('/stock/' + stock);
	const data = await res.json();
	if( !data.err){
		document.querySelector("#name").textContent = "Name: " + data.name;
  		document.querySelector("#price").textContent = "Price: " + data.price + " USD";
  		document.querySelector("#exchange").textContent = "Exchange: " + data.exchange;
	}else{
		document.querySelector("#name").textContent = "Error: " + data.err;
	}
	
}

async function deleteItem(){
    const sticker = this.parentNode.childNodes[1].innerText
	const price = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteboughtStock', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'sticker': sticker,
			  'price':price
            })
          });
        const data = await response.json();
        location.reload();
    }catch(err){
        console.log(err);
    }
}