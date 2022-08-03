/*//dropdown list
async function loadDropdown(){
	const stateList = document.getElementById("states")
	try{
        const response = await fetch(`https://state-capitals-api.herokuapp.com/api/states`)
        const data = await response.json()

        console.log(data)
        //document.querySelector('h2').innerText = data.capital
    }catch(error){
        console.log(error)
    }
};

//show the capital
document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const stateName = document.querySelector('input').value //change input to menu option
    //const stateName = document.querySelector('#states').value
    try{
        const response = await fetch(`https://state-capitals-api.herokuapp.com/api/${stateName}`)
        const data = await response.json()

        console.log(data)
        document.querySelector('h2').innerText = data.capital
    }catch(error){
        console.log(error)
    }
}*/

// variable definition

// select the data list
const stateDataList = document.getElementById('state_list');
const form = document.querySelector('form');

const capital = document.getElementById('capital');

// look for IIFR function : https://www.tutorialsteacher.com/javascript/immediately-invoked-function-expression-iife
(() => {

	// your local url to fetch
	const url = "https://state-capitals-api.herokuapp.com/api/states";
	fetch(url)
	.then(
		function(res){
			if (res.status !== 200) {
				console.warn("Looks like there was a problem")
				return false;
			}
			// if result
			res.json().then(function(data){
			// Loop throught the object array, and for each, populate the data list with a new option.
			Object.values(data).forEach((state,index) => {
				stateDataList.appendChild( new Option(state.name,state.name))				
			})			
			});
		}
	)
	.catch(function(err){
		console.error(`There was an error: ${err}`)
	})

	
	
	// The form
	form.addEventListener('submit', (e) => {
		const stateName = document.querySelector('input').value		
		// don't send the form
		 e.preventDefault();
		if(stateName)
		{

		fetch(`https://state-capitals-api.herokuapp.com/api/states/${stateName}`)
		.then(
			function(res){
			if (res.status !== 200) {
				console.warn("Looks like there was a problem")
				return false;
			}
			// if result
			res.json().then(function(data){
				capital.textContent = data.capital;	
				console.log(data);	
			});
		})
		.catch(function(err){
			console.error(`There was an error: ${err}`)
		})
		}
		e.stopPropagation();
		
	
	})


})();