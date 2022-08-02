const deleteEntry = document.querySelectorAll('.fa-trash')

const item = document.querySelectorAll('.linkedIn')


Array.from(deleteEntry).forEach((element)=>{
    element.addEventListener('click', deleteOneEntry)
})
Array.from(item).forEach((element)=>{
    element.addEventListener('click', changeLinkedIn)
})


async function deleteOneEntry(){

    //this= this item, in this case <i> parentnode = <td>, parentnode(grandparent of this)=<tr>. chidren[3].innertext=<td>with teh value of name
    const name = this.parentNode.parentNode.children[3].innerText
    try{
        const response = await fetch('deleteOneEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function changeLinkedIn(){
    const name = this.parentNode.children[3].innerText
    const boolLink = this.innerText ==='true'

    try{
        const response = await fetch('linkedIn', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                addLinkedIn: boolLink
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}