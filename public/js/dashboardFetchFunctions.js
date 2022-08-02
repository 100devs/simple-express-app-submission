class DishLiBtnGroup {
    constructor(el) {
        this._el = el
        el.addEventListener('click', this.onClick.bind(this)) 
    }

    onClick(e) {
        const action = e.target.dataset.action
        if (action) {
            this[action](e)
        }
    }

    async markCooked(e) {
        //Get the _id of the dish associated with this markCooked button
        const li = e.target.closest('li')
        if (!li) return
        const dishID = li.id

        try {
            const response = await fetch(`/dishes/${dishID}`, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                'updateAction': 'markCooked'
                })
            })
            //window.location or simply location object is used to get information about the location of the current web page (document) and also to modify it.
            window.location = response.url  

        } catch(err){
            console.log(err)
        }
    }

    populateEditModal(e) {
        //Get the _id of the dish associated with this edit button
        const li = e.target.closest('li')
        if (!li) return
        const dishID = li.id

        //Populate the modal's name field with the name of the dish list item being edited
        const editDishNameInput = document.querySelector('#editDishNameInput')
        editDishNameInput.value = li.querySelector('.dishName').innerText

        //Populate the modal's meal select field with the meal of the dish list item being edited
        const editMealSelect = document.querySelector('#editMealSelect')
        editMealSelect.value = li.querySelector('.mealBadge').innerText

        //Populate the modal's link field with the recipe link of the dish list item being edited, if any
        const editRecipeLinkInput = document.querySelector('#editRecipeLinkInput')
        const recipeLink = li.querySelector('.recipeLink')
        editRecipeLinkInput.value = recipeLink ? recipeLink.href : ''

        //Add a data attribute with the dishID to the update button
        document.querySelector('#update-btn').setAttribute('data-dishid', dishID)
    }

    async delete(e) {
        //Get the _id of the dish associated with this delete button
        const li = e.target.closest('li')
        if (!li) return
        const dishID = li.id

        try {
            const response = await fetch(`/dishes/${dishID}`, {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
            })
            window.location = response.url  

        } catch(err){
            console.log(err)
        }
    }
}

const dishLiBtnGroups = document.querySelectorAll('li.dish .btn-group')

Array.from(dishLiBtnGroups).forEach((btnGroup)=>{
    new DishLiBtnGroup(btnGroup)
})

// When 'update' button in Edit Modal is clicked, send PUT request
document.querySelector('#update-btn').addEventListener('click', editDishInfo)

async function editDishInfo() {
    //Get the _id of the dish being edited (previously set as a data-dishID attribute on the modal update button)
    const dishID = document.querySelector('#update-btn').dataset.dishid
    const dishName = document.querySelector('#editDishNameInput').value
    const meal = document.querySelector('#editMealSelect').value
    const recipeLink = document.querySelector('#editRecipeLinkInput').value

    try {
        const response = await fetch(`/dishes/${dishID}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            'updateAction': 'editDishInfo',
            'dishNameFromJS': dishName, 
            'mealFromJS': meal, 
            'recipeLinkFromJS': recipeLink 
            })
        })
        window.location = response.url  

    } catch(err){
        console.log(err)
    }
}


