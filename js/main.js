alert('working')

/*const sources = ['https://www.pdsa.org.uk/what-we-do/blog/10-amazing-facts-about-dogs']

async function apiRequest(clickID){
    let subject = clickID
    try{
        const res = await fetch(`https://mb-fun-fact-api.herokuapp.com/api/${subject}`)
        const data = await res.json()

        console.log(data)
        console.log(document.querySelector('h2').innerHTML = data[randomFact()])
    }catch(error){
        console.log(error)
    }
}

function randomFact() {
    let funFact = Math.random()

    if (funFact < .5){
        return 'fun fact 1'
    } else {
        return 'fun fact 2'
    }
}

console.log("Sources I used for fun facts:", sources)*/