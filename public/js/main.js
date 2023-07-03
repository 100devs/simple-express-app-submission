const deleteBtn = document.querySelectorAll('#deleteButton')
document.querySelector('#next').addEventListener('click', (nextFact))

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

async function deleteItem() {
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }        
}
let counter = 0
async function nextFact() {
    try {
        const response = await fetch ('https://simple-crud-app-production.up.railway.app/api')
        const data = await response.json()
        document.querySelector('#deleteButton').style.display = 'flex';
        document.querySelector('form').style.display = 'flex';
        document.querySelector('ul').style.display = 'flex';
        if (counter == data.length - 1) counter = 0
        document.querySelector('#fact').innerText = data[counter].fact   
        counter++
    }catch(error) {
        console.log(error) 
    }
}

// let userText= document.querySelector('input').value.split(' ').join('_')
// console.log(userText)
// fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + userText)
//     .then(res => res.json())
//     .then(data => {   
//         console.log(data, counter)
//         if (counter == data.drinks.length) counter = 0
//         document.querySelector('h2').innerText = data.drinks[counter].strDrink
//         document.querySelector('h3').innerText = data.drinks[counter].strInstructions
//         document.querySelector('img').src = data.drinks[counter].strDrinkThumb
//         counter++
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     })