function bar(){
    let li = document.querySelectorAll('.list') || []
    li.forEach(x=>{
        let ep = x.children[1].children[0].children[2].children[3].textContent
        let currentEp = x.children[1].children[0].children[2].children[2].value
        let percent = parseFloat(currentEp/ep*100).toFixed(2)
        x.children[1].children[0].children[1].children[0].style.width = `${percent}%`
    })


}
window.onload = bar()

let trashBts = document.querySelectorAll('.trash') || []
trashBts.forEach(x=>{
    x.addEventListener('click', async (e)=>{
        let name = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent
        let response = await fetch('/', {method: 'DELETE', body: JSON.stringify({
            name: name
        }), headers: {'Content-type': 'application/json; charset=UTF-8'}});
        let data = await response.json();
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
        console.log(data)
    })
})
let rightBtns = document.querySelectorAll('.right')
rightBtns.forEach(x=>{
    x.addEventListener('click', async (e)=>{
        let progressBar = e.target.parentElement.parentElement.parentElement.children[1].children[0]
        let title = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent
        let inputValue = e.target.parentElement.parentElement.parentElement.children[2].children[2]
        let maxValue = e.target.parentElement.parentElement.parentElement.children[2].children[3].textContent
        if(inputValue.value < +maxValue){
            inputValue.value = `${+inputValue.value + +1}`
            let percent = parseFloat(inputValue.value/maxValue*100).toFixed(2)
            progressBar.style.width = `${percent}%`
            let response = await fetch('/', {method: 'PUT', body: JSON.stringify({
                title: title,
                newValue: inputValue.value
            }), headers: {'Content-type': 'application/json; charset=UTF-8'}});
            let data = await response.json();
            console.log(data)
        }
    })
})
let leftBtns = document.querySelectorAll('.left')
leftBtns.forEach(x=>{
    x.addEventListener('click', async (e)=>{
        let maxValue = e.target.parentElement.parentElement.parentElement.children[2].children[3].textContent
        let progressBar = e.target.parentElement.parentElement.parentElement.children[1].children[0]
        let title = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent
        let inputValue = e.target.parentElement.parentElement.parentElement.children[2].children[2]
        if(inputValue.value > 0){
            inputValue.value = `${+inputValue.value - +1}`
            let percent = parseFloat(inputValue.value/maxValue*100).toFixed(2)
            progressBar.style.width = `${percent}%`
            let response = await fetch('/', {method: 'PUT', body: JSON.stringify({
                title: title,
                newValue: inputValue.value
            }), headers: {'Content-type': 'application/json; charset=UTF-8'}});
            let data = await response.json();
            console.log(data)

        }
    })
})
let epInput = document.querySelectorAll('.epInput')
epInput.forEach(x=>{
    x.addEventListener('change', async (e)=>{
        // let newValue = Number(e.target.value.split(''))
        // let newValue = e.target.innerText.split('')
        if(e.target.value == ""){
            return
        }
        if(+e.target.value > +e.target.max || +e.target.value < e.target.min){
            return
        }
        let progressBar = e.target.parentElement.parentElement.parentElement.children[0].children[1].children[0]
        let title = e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent
        let percent = parseFloat(e.target.value/e.target.max*100).toFixed(2)
        progressBar.style.width = `${percent}%`
        let newEp = e.target.value
        console.log(`${title}: EP-${newEp}`)
        let response = await fetch('/', {method: 'PUT', body: JSON.stringify({
            title: title,
            newValue: newEp
        }), headers: {'Content-type': 'application/json; charset=UTF-8'}});
        let data = await response.json();
        console.log(data)
        
    })
})