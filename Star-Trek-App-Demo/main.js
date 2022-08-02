document.querySelector('#getButton').addEventListener('click', apiRequest);
async function apiRequest(){
    const alienName = document.querySelector('input').value;
    try{
        const response = await fetch(`https://star-trek-api-demo-mh.herokuapp.com/api/${alienName}`); //await says await for fetch to be fulfilled and have response before I do anything else. don't want code to get ahead of itself. await for the fetch to be completed.
        const data = await response.json();
        console.log(data);
        document.getElementById('alienName').innerText = data.speciesName;
        document.getElementById('alienWorld').innerText = data.homeworld;
        document.getElementById('alienFeatures').innerText = data.features;
        document.getElementById('alienFacts').innerText = data.interestingFact;
        document.getElementById('alienExamples').innerText = data.notableExamples;

        document.getElementById('alienImage').src = data.image;
        document.getElementById('alienCaption').innerText = data.speciesName;
        

    } catch(error) {
        console.log(error);
    }
}