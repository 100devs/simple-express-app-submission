const deleteText = document.querySelectorAll('.fa-trash')
// const thumbText = document.querySelectorAll('.fa-thumbs-up')
const items = document.querySelectorAll('.item')
const update = document.querySelectorAll('.update')
Array.from(update).forEach((element)=>{
  element.addEventListener('click', updatePrice)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(items).forEach((element)=>{
  element.addEventListener('click', addToTotalPrice)
})
Array.from(items).forEach((element)=>{
  element.addEventListener('click', addItemToSubtotal)
})

// Array.from(thumbText).forEach((element)=>{
//     element.addEventListener('click', updatePrice)
// })

async function deleteItem(){
    const iName = this.parentNode.childNodes[1].innerText
    const iPrice = this.parentNode.childNodes[3].innerText
    console.log(iName, iPrice)
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemNameS': iName,
              'itemPriceS': iPrice
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function updatePrice(){
    const iName = this.parentNode.childNodes[1].innerText
    const iPrice = this.parentNode.childNodes[3].innerText
    const iPic = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('updatePrice', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemNameS': iName,
              'itemPriceS': iPrice,
              'itemPicS': iPic
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}
console.log(roundToTwo(2.005));
console.log(roundToTwo(1.005));


let priceBeforeTax = 0
function addToTotalPrice() {
  let total = document.querySelector('#total')
  const itemPrice = Number(this.querySelector('.price').innerText.slice(1))
  let tax = document.querySelector('#tax')
  let taxRate = 0.075

  priceBeforeTax = roundToTwo(priceBeforeTax + itemPrice)
  let taxAmount = roundToTwo(priceBeforeTax * taxRate)

  tax.innerText = `Tax: $${roundToTwo(taxAmount).toFixed(2)}`

  total.innerText = `Total: $${roundToTwo(priceBeforeTax + taxAmount).toFixed(2)}`
  console.log(itemPrice, priceBeforeTax)
  
  
}

let subtotalAmount = priceBeforeTax

let allItems = []

function addItemToSubtotal() {
    
  let subtotal = document.querySelector('#subtotal')
  let itemList = document.querySelector('#itemList')
  const itemName = this.querySelector('.name').innerText
  const itemPrice = Number(this.querySelector('.price').innerText.slice(1))
    console.log()
  console.log(itemPrice)


  if(!allItems.find(i => i.itemName = itemName)){
    allItems.push({itemName: itemName, itemPrice: itemPrice,amount: 1})
    addItem(allItems)
    console.log(allItems)
  }else{
    console.log(`${itemName} found`)
    allItems[allItems.findIndex(i => i.itemName = itemName)].amount+

    console.log(allItems)
    
  }

  function addItem(array){
      let li = document.createElement('li')
      console.log('tegregregfregeest')
      
     
      for(let i = 0; i < array.length; i++){
        // let subItem = li.innerHTML = `<span>${array[i].itemName}</span><span>x${array[i].amount}<span>= $${array[i].itemPrice * array[i].amount}</span>`
        li.appendChild(document.createTextNode(`${array[i].itemName}`))
        li.appendChild(document.createTextNode(` x ${array[i].amount}`))
        li.appendChild(document.createTextNode(`Each: ${roundToTwo(array[i].itemPrice).toFixed(2)}`))
        li.appendChild(document.createTextNode(`=${roundToTwo(array[i].itemPrice * array[i].amount).toFixed(2)}`))
  
        
  
  
        itemList.append(li)
        
      }
      
    }
    console.log(subtotalAmount)
    subtotal.innerText = `Subtotal: $${subtotalAmount}`
  
    function updateSubtotal(){
      
    }
  
    function salesTax(){
      let total = document.querySelector('#total')
      tax.innerText = `$${Number(total.innerText.slice(1)) * taxRate}`
      total.innerText = `${Number(total.innerText.slice(1)) + Number(tax.innerText.slice(1))}`
  
    }
  
  }





