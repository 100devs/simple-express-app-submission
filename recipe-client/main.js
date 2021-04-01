let input = document.querySelector('#recipeName')

document.querySelector('.submit').addEventListener('click', getRecipe)

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.querySelector("button").click();
    }
});

async function getRecipe () {
    let recipeName = document.querySelector('#recipeName').value
    console.log(recipeName);
    // recipeName = recipeName.split(' ').map((el, i, arr) => { (el !== arr[arr.length-1]) ? el + '%20' : el}).join('');
    // console.log(recipeName);    
    try {
        const response = await fetch(`https://ash-recipe-api.herokuapp.com/api/recipes/${recipeName}`)
        const data = await response.json()
        console.log(data);
        if (typeof data === "object"){
            document.querySelector('.recipe-name').innerText = data.name
            document.querySelector('.author').innerText = data.author
            document.querySelector('.description').innerText = data.description
            document.querySelector('.recipe-link').innerText = `Find the recipe here: ${data.link}`
            document.querySelector('#ingredient-1').innerText = data.ingredients[0].name
            document.querySelector('#amount-1').innerText = data.ingredients[0].amount
            document.querySelector('#ingredient-2').innerText = data.ingredients[1].name
            document.querySelector('#amount-2').innerText = data.ingredients[1].amount
            document.querySelector('#ingredient-3').innerText = data.ingredients[2].name
            document.querySelector('#amount-3').innerText = data.ingredients[2].amount;
            document.querySelector('#ingredient-4').innerText = data.ingredients[3].name
            document.querySelector('#amount-4').innerText = data.ingredients[3].amount
            document.querySelector('#ingredient-5').innerText = data.ingredients[4].name
            document.querySelector('#amount-5').innerText = data.ingredients[4].amount

            if (data.video !== null){
                document.querySelector('iframe').src = data.video;
                document.querySelector('.video-container').classList.remove('display-none')
            } else {
                document.querySelector('.video-container').classList.add('display-none')
            }


        }       

    } catch (error) {
        console.log(error);
    }


}