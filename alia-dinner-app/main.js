document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const dinnerName = document.querySelector('input').value
    try {
        const response = await fetch(`https://alia-dinner-api.herokuapp.com/api/${dinnerName}`) 
        const data = await response.json()
        console.log(data)

        document.getElementById('dinnerName').innerText = data.mealName

        document.getElementById('ingredient1').innerText = data.ingredientOne
        document.getElementById('ingredient2').innerText = data.ingredientTwo
        document.getElementById('ingredient3').innerText = data.ingredientThree
        document.getElementById('ingredient4').innerText = data.ingredientFour
        document.getElementById('ingredient5').innerText = data.ingredientFive
        document.getElementById('ingredient6').innerText = data.ingredientSix
        document.getElementById('ingredient7').innerText = data.ingredientSeven
        document.getElementById('ingredient8').innerText = data.ingredientEight
        document.getElementById('ingredient9').innerText = data.ingredientNine
        document.getElementById('ingredient10').innerText = data.ingredientTen

        document.getElementById('step1').innerText = data.directionsStepOne
        document.getElementById('step2').innerText = data.directionsStepTwo
        document.getElementById('step3').innerText = data.directionsStepThree
        document.getElementById('step4').innerText = data.directionsStepFour
        document.getElementById('step5').innerText = data.directionsStepFive

        document.getElementById('dinnerImage').src = data.image


    } catch(error) {
        console.log(error)
    } 
//    data.ingredientSix = 'null'
//     if (data.ingredientSix != 'null') {
//         document.getElementById('ingredient6').style.display = 'block';
//     } else {
//         document.getElementById('ingredient6').style.display = 'none';
//     }
}