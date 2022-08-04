const deleteBtn = document.querySelector('.fa-trash')
const editBtn = document.querySelector('fas-edit')

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteItem)
})

Array.from(editBtn).forEach((element) => {
    element.addEventListener('click', edit)
})

