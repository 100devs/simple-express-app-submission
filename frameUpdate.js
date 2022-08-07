import fs from 'fs'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

const baseURL = "https://www.dustloop.com"

//fetches the main ggst wiki page from dustloop and passes the html to parseIndex()
async function fetchIndex() {
    let html = await fetch("https://www.dustloop.com/wiki/index.php?title=Guilty_Gear_-Strive-")
    let data = await html.text()

    return parseIndex(data)
}

//pulls all of the character links from the bottom of the page into an array
function parseIndex(html) {
    const { document } = new JSDOM(html).window

    const container = document.querySelector('#fpbottomsection')

    return Array.from(container.querySelectorAll('.charaLabel')).map(link => link.querySelector('a').href)

}

//scrapes a character's frame data from the page and returns it as JSON
async function parseFrameData(frameUrl) {
    let html = await fetch(frameUrl)

    /* 
     * This was fixed in the html.
     *
    //some characters links from the main page redirect and apparently there's
    //no way to fetch the url from a redirect?
    //so, we have to hard code the exceptions...
    if (html.status === 404) {
        let retryURL = html.url.replace('/Frame_Data', '')

        if (retryURL.includes('Chipp')){
            retryURL += '_Zanuff'
        }else if (retryURL.includes('Goldlewis')){
            retryURL += '_Dickinson'
        }else if (retryURL.includes('Leo')){
            retryURL += '_Whitefang'
        }else if (retryURL.includes('Millia')){
            retryURL += '_Rage'
        }else if (retryURL.includes('Ramlethal')){
            retryURL += '_Valentine'
        }
        html = await fetch(retryURL + '/Frame_Data')
    }
    
    */

    let data = await html.text()

    const { document } = new JSDOM(data).window

    const tables = Array.from(document.querySelectorAll('tr')).map(data => {
        return Array.from(data.querySelectorAll('td')).map(td => td.innerHTML)
    })

    let characterString = ''

    tables.forEach(tr => {
        if (tr[0] === '') {
            characterString += (parseMove(tr.slice(1)) + ',')
        }
    })

    characterString = JSON.stringify('{' + characterString.slice(0,-1) + '}')
    return JSON.parse(characterString)
}

//parseFrameData() calls this for each of a character's moves to convert them to JSON
//then puts them all into one big object to represent the character
function parseMove(arr) {

    if (arr.length === 14) {
        //correction to some leftovers from scraping
        arr[12] = arr[12].split('<br>').map(e => e.trim()).join(', ')
        return `"${arr[0]}" : {
            "damage" : "${arr[1]}",
            "guard" : "${arr[2]}",
            "startup" : "${arr[3]}",
            "active" : "${arr[4]}",
            "recovery" : "${arr[5]}",
            "onBlock" : "${arr[6]}",
            "onHit" : "${arr[7]}",
            "riscGain" : "${arr[8]}",
            "riscLoss" : "${arr[9]}",
            "level" : "${arr[10]}",
            "counter" : "${arr[11]}",
            "invuln" : "${arr[12]}",
            "prorate" : "${arr[13]}"
        }`

    //if one of these arrays is 15 length instead of 14, it is a special move
    //so, we include the move's name in the object as well
    } else if (arr.length ===15) {
        //more corrections...
        arr[2] = arr[2].replace('<br>', ', ')
        
        if (arr[11].includes('tooltip')) {
            arr[11] = '2'
        }

        if (arr[7].includes('wiki')) {
            arr[7] = arr[7].split(' ')[0]
        }

        if (arr[8].includes('wiki')) {
            arr[8] = arr[8].split(' ')[0]
        }

        arr[13] = arr[13].split('<br>').map(e => e.trim()).join(', ')
        // handling for leo's bt. normals since they are in a table with name column
        const nameString = arr[1] ? `${arr[0]} (${arr[1]})` : arr[0]
        return `"${nameString}" : {
            "damage" : "${arr[2]}",
            "guard" : "${arr[3]}",
            "startup" : "${arr[4]}",
            "active" : "${arr[5]}",
            "recovery" : "${arr[6]}",
            "onBlock" : "${arr[7]}",
            "onHit" : "${arr[8]}",
            "riscGain" : "${arr[9]}",
            "riscLoss" : "${arr[10]}",
            "level" : "${arr[11]}",
            "counter" : "${arr[12]}",
            "invuln" : "${arr[13]}",
            "prorate" : "${arr[14]}"
        }`

    }
    
}

//finally, this function creates the index of links to scrape,
//creates an array of character names for naming the JSON files that will be written
//then parses the frame data for each character and writes the JSON as a file
async function writeFrameData() {
    let index = await fetchIndex()
    let endpoints = []

    index = index.map(a => {
        endpoints.push(a.split('/')[a.split('/').length-1].toLowerCase())
        return baseURL + a + '/Frame_Data'
    })
    
    let allString = '{'

    for (let i = 0; i < index.length; i++) {
        let data = await parseFrameData(index[i])
        allString += `"${endpoints[i]}" : ${data},`
        console.log(`Writing ${endpoints[i]}.json...`)
        fs.writeFileSync(`./data/ggst/${endpoints[i]}.json`, data)
    }

    console.log('Writing all.json...')
    fs.writeFileSync(`./data/ggst/all.json`, (allString.slice(0,-1) + '}'))
}

writeFrameData()
