console.log('hello')
let addToListBtn = document.querySelectorAll('.addbtn') || []

addToListBtn.forEach(x=>{
    x.addEventListener('click', async (e)=>{
        let imgValue = e.target.parentElement.children[0].children[0].currentSrc
        let titleValue = e.target.parentElement.children[2].textContent
        let synopsisValue = e.target.parentElement.children[0].children[1].lastElementChild.innerText
        let episodesValue = e.target.parentElement.children[1].children[0].lastChild.textContent
        let scoreValue = e.target.parentElement.children[1].children[1].lastChild.textContent
        let response = await fetch('/', {method: 'POST', body: JSON.stringify({
            title: titleValue,
            episodes: episodesValue,
            score: scoreValue,
            synopsis: synopsisValue,
            imgUrl: imgValue

        }), headers: {'Content-type': 'application/json; charset=UTF-8'}});
        let data = await response.json();
        console.log(data)
    })
})
