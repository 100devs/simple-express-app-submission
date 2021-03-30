let deleteElems = Array.from(document.querySelectorAll('.deletebtn'));

deleteElems.forEach(el => {
    el.addEventListener('click', async function(){
        const key = (this.parentNode.childNodes[1].childNodes[1].innerText);
        const res = await fetch('/delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                flat: key
            })
        });
        const data = await res.json();
        console.log(data);
    })
});