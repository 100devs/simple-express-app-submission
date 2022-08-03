export default async function deleteTopping() {
  const deleteCode = window.prompt("Password required:")
  const topping = this.parentNode.childNodes[3].innerText
  try {
    const response = await fetch('deleteTopping', {
      method:'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'toppingToDelete': topping,
        '_pw': deleteCode
      })
    })
    const data = await response.json()
    data.msg ?
     alert(data.msg) :
     location.reload()
  }
  catch(err) {
    console.log(err)
  }
}
