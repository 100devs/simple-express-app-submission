// main js file
const form = document.querySelector('#mainForm')
const formContent = document.querySelector('.formContent')

const cuisineList = [
    'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese'
]


window.onload = event => {
    const wantedCuisineList = cuisineList.map(item => {
        return `<div><label><input type="checkbox" name="${item}" value="${item}"/>${item}</label></div>`
    })
    console.log('page is fully loaded')
    formContent.innerHTML = wantedCuisineList.join('')

    const firstSelections = document.querySelectorAll('input[type="checkbox"')

    // logic for disbaling next button
    firstSelections.forEach(box => {
        box.addEventListener('click', function handleClick(event) {
            for (const box of firstSelections) {
                const buttonOne = document.querySelector('.buttonOne')
                if (box.checked === true) {
                    buttonOne.disabled = false
                    buttonOne.classList.add('buttonOneHover')
                    break
                }
                buttonOne.disabled = true
            }
        })
    })
    const buttonOne = document.querySelector('.buttonOne')

    // handle when the user clicks the next button
    buttonOne.addEventListener('click', function handleClick(event) {

        buttonOne.classList.remove('buttonOneHover')

        // change form title
        const formTitle = document.querySelector('#formTitle')
        formTitle.classList.add('formTitleExclude')
        formTitle.classList.remove('formTitleInclude')
        formTitle.innerHTML = 'Please select cuisine(s) that you would like to <span>exclude</span> in your search.'

        // get a list of strings that include all of the cuisines checked by the user when they clicked next
        const wantedCuisines = []
        firstSelections.forEach(box => {
            if (box.checked === true) {
                wantedCuisines.push(box.value)
            }
        })
        const unwantedCusineItems = cuisineList.filter(cuisine => !wantedCuisines.includes(cuisine))
        const unwantedCusineList = unwantedCusineItems.map(item => {
            return `<div><label><input type="checkbox" name="${item}" value="${item}"/>${item}</label></div>`
        })
        formContent.innerHTML = unwantedCusineList.join('')

        // make the reset button enabled
        const resetButton = document.querySelector('#resetButton')
        // remove the disabled class
        resetButton.classList.remove('resetButtonDisabled')
        // add the enabled class
        resetButton.classList.add('resetButtonEnabled')
        resetButton.addEventListener('click', function() {
            location.reload()
        })

        // change the value and the disabled attributes of the button
        buttonOne.value = 'find recipe'
        buttonOne.disabled = true

        const secondSelections = document.querySelectorAll('input[type="checkbox"')
        // logic for disbaling next button
        secondSelections.forEach(box => {
            box.addEventListener('click', function handleClick(event) {
                for (const box of secondSelections) {
                    const buttonOne = document.querySelector('.buttonOne')
                    if (box.checked === true) {
                        buttonOne.disabled = false
                        buttonOne.classList.add('buttonOneHover')
                        break
                    }
                    buttonOne.disabled = true
                }
            })
        })
        // listen for final click
        buttonOne.addEventListener('click', function handleClick(event) {
            // get a list unwanted cuisines
            const unwantedCuisines = []
            secondSelections.forEach(box => {
                if (box.checked === true) {
                    unwantedCuisines.push(box.value)
                }
            })
            
            // fetch to server to retreive recipe from API
            fetch('/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {wantedCuisines: wantedCuisines.join(','), unwantedCuisines: unwantedCuisines.join(',')} )
            })
                .then(response => response.json())
                .then(data => {
                    // remove the form boxes and the submit button leave a reset button
                    formTitle.style.display = 'none'
                    formContent.style.display = 'none'
                    buttonOne.style.display = 'none'
                    resetButton.style.width = '100%'
                    resetButton.style.padding = '2rem 0'
                    resetButton.style['text-align'] = 'center'
                    resetButton.classList.add('resetButtonHover')
                    form.style.padding = '0'
                    form.style.height = '4rem'
                    form.style['justify-content'] = 'center'
                    form.style.border = 'none'

                    // add all recipe data to dom
                    document.querySelector('.recipeTitle').textContent = data.title
                    document.querySelector('.recipeImage').src = data.image
                    document.querySelector('.recipeTitle').href = data.sourceUrl
                    document.querySelector('.recipeSummary').innerHTML = data.summary
                })
        })        
    })
}

