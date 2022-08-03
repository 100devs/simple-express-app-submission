const deleteButtons = document.querySelectorAll('.delete-button');
const changeButtons = document.querySelectorAll('.change-button');



Array.from(deleteButtons).forEach((button)=>{
    button.addEventListener('click', deletePlayer);
})

Array.from(changeButtons).forEach((button) => {
    button.addEventListener('click', changePlayer);
})


async function deletePlayer(){
   
    const playerName = this.parentNode.parentNode.childNodes[3].innerText;
   console.log(playerName)
    try{
        const response = await fetch('/players', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({               
                    name: playerName                
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload();  

    }catch(err){
        console.log(err)
    }
}

async function changePlayer(){ 
    const playerName = this.parentNode.parentNode.childNodes[3].innerText;
   console.log(playerName)
    try{
        const response = await fetch('/players', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({               
                    name: playerName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload();

    }catch(err){
        console.log(err)
    }
   
}

