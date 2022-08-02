// main
const deleteButtons = document.querySelectorAll('.delete')
// add event listeners to delete buttons
Array.from(deleteButtons).forEach((button) => { button.addEventListener('click', deleteBoard) })
// delete from database / reload
async function deleteBoard() {
    const boardBrand = this.parentNode.childNodes[1].innerText.trim()
    try {
        const response = await fetch('deleteBoard', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                brand: boardBrand,
            })
        })
        const data = await response.json()
        window.location.reload(true)
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}