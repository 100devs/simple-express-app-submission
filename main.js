document.querySelector("#getButton").addEventListener("click", apiRequest);

async function apiRequest() {
    const alienName = document.querySelector("input").value;
    try {
        const response = await fetch(
            `https://orville-api.herokuapp.com/api/${alienName}`
        );
        const data = await response.json();
        console.log(data);

        document.querySelector("#alienName").innerText = `${data.speciesName}`;
        document.querySelector("#alienFeature").innerHTML = `${data.features}`;
        document.querySelector(
            "#alienFacts"
        ).innerHTML = `${data.interestingFact}`;
        document.querySelector("#alienWorld").innerHTML = `${data.homeWorld}`;
        document.querySelector(
            "#alienMembers"
        ).innerHTML = `${data.notableMembers}`;
        // IMAGE
        document.querySelector("#alienImage").src = `${data.image}`;
        document.querySelector("#alienCaption").innerHTML = `${data.speciesName}`;
    } catch (error) {
        console.log(error);
    }
}
