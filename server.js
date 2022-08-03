const express = require("express")
const app = express()
const cors = require("cors");
//const { response } = require("express");
const PORT = 8000

//app.set("view engine", "ejs")
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use(cors())

const states = {
    "alabama": {
        "name": "Alabama",
        "capital": "Montgomery",
        "abbreviation": "AL",
        "cap population": 198000
    },
    "alaska": {
        "name": "Alaska",
        "capital": "Juneau",
        "abbreviation": "AK",
        "cap population": 32000
    },
    "arizona": {
        "name": "Arizona",
        "capital": "Phoenix",
        "abbreviation": "AZ",
        "cap population": 1660000
    },
    "arkansas": {
        "name": "Arkansas",
        "capital": "Little Rock",
        "abbreviation": "AR",
        "cap population": 197000
    },
    "california": {
        "name": "California",
        "capital": "Sacramento",
        "abbreviation": "CA",
        "cap population": 508000
    },
    "colorado": {
        "name": "Colorado",
        "capital": "Denver",
        "abbreviation": "CO",
        "cap population": 716000
    },
    "connecticut": {
        "name": "Connecticut",
        "capital": "Hartford",
        "abbreviation": "CT",
        "cap population": 122000
    },
    "delaware": {
        "name": "Delaware",
        "capital": "Dover",
        "abbreviation": "DE",
        "cap population": 38000
    },
    "florida": {
        "name": "Florida",
        "capital": "Tallahassee",
        "abbreviation": "FL",
        "cap population": 193000
    },
    "georgia": {
        "name": "Georgia",
        "capital": "Atlanta",
        "abbreviation": "GA",
        "cap population": 498000
    },
    "hawaii": {
        "name": "Hawaii",
        "capital": "Honolulu",
        "abbreviation": "HI",
        "cap population": 347000
    },
    "idaho": {
        "name": "Idaho",
        "capital": "Boise",
        "abbreviation": "ID",
        "cap population": 228000
    },
    "illinois": {
        "name": "Illinois",
        "capital": "Springfield",
        "abbreviation": "IL",
        "cap population": 114000
    },
    "indiana": {
        "name": "Indiana",
        "capital": "Indianapolis",
        "abbreviation": "IN",
        "cap population": 867000
    },
    "iowa": {
        "name": "Iowa",
        "capital": "Des Moines",
        "abbreviation": "IA",
        "cap population": 216000
    },
    "kansas": {
        "name": "Kansas",
        "capital": "Topeka",
        "abbreviation": "KS",
        "cap population": 125000
    },
    "kentucky": {
        "name": "Kentucky",
        "capital": "Frankfort",
        "abbreviation": "KY",
        "cap population": 27000
    },
    "louisiana": {
        "name": "Louisiana",
        "capital": "Baton Rouge",
        "abbreviation": "LA",
        "cap population": 221000
    },
    "maine": {
        "name": "Maine",
        "capital": "Augusta",
        "abbreviation": "ME",
        "cap population": 18000
    },
    "maryland": {
        "name": "Maryland",
        "capital": "Annapolis",
        "abbreviation": "MD",
        "cap population": 39000
    },
    "massachusetts": {
        "name": "Massachusetts",
        "capital": "Boston",
        "abbreviation": "MA",
        "cap population": 694000
    },
    "michigan": {
        "name": "Michigan",
        "capital": "Lansing",
        "abbreviation": "MI",
        "cap population": 118000
    },
    "minnesota": {
        "name": "Minnesota",
        "capital": "Saint Paul",
        "abbreviation": "MN",
        "cap population": 307000
    },
    "mississippi": {
        "name": "Mississippi",
        "capital": "Jackson",
        "abbreviation": "MS",
        "cap population": 164000
    },
    "missouri": {
        "name": "Missouri",
        "capital": "Jefferson City",
        "abbreviation": "MO",
        "cap population": 42000
    },
    "montana": {
        "name": "Montana",
        "capital": "Helena",
        "abbreviation": "MT",
        "cap population": 32000
    },
    "nebraska": {
        "name": "Nebraska",
        "capital": "Lincoln",
        "abbreviation": "NE",
        "cap population": 287000
    },
    "nevada": {
        "name": "Nevada",
        "capital": "Carson City",
        "abbreviation": "NV",
        "cap population": 55000
    },
    "new hampshire": {
        "name": "New Hampshire",
        "capital": "Concord",
        "abbreviation": "NH",
        "cap population": 43000
    },
    "new jersey": {
        "name": "New Jersey",
        "capital": "Trenton",
        "abbreviation": "NJ",
        "cap population": 83000
    },
    "new mexico": {
        "name": "New Mexico",
        "capital": "Santa Fe",
        "abbreviation": "NM",
        "cap population": 84000
    },
    "new york": {
        "name": "New York",
        "capital": "Albany",
        "abbreviation": "NY",
        "cap population": 97000
    },
    "north carolina": {
        "name": "North Carolina",
        "capital": "Raleigh",
        "abbreviation": "NC",
        "cap population": 469000
    },
    "north dakota": {
        "name": "North Dakota",
        "capital": "Bismarck",
        "abbreviation": "ND",
        "cap population": 73000
    },
    "ohio": {
        "name": "Ohio",
        "capital": "Columbus",
        "abbreviation": "OH",
        "cap population": 892000
    },
    "oklahoma": {
        "name": "Oklahoma",
        "capital": "Oklahoma City",
        "abbreviation": "OK",
        "cap population": 649000
    },
    "oregon": {
        "name": "Oregon",
        "capital": "Salem",
        "abbreviation": "OR",
        "cap population": 173000
    },
    "pennsylvania": {
        "name": "Pennsylvania",
        "capital": "Harrisburg",
        "abbreviation": "PA",
        "cap population": 49000
    },
    "rhode island": {
        "name": "Rhode Island",
        "capital": "Providence",
        "abbreviation": "RI",
        "cap population": 179000
    },
    "south carolina": {
        "name": "South Carolina",
        "capital": "Columbia",
        "abbreviation": "SC",
        "cap population": 133000
    },
    "south dakota": {
        "name": "South Dakota",
        "capital": "Pierre",
        "abbreviation": "SD",
        "cap population": 13000
    },
    "tennessee": {
        "name": "Tennessee",
        "capital": "Nashville",
        "abbreviation": "TN",
        "cap population": 669000
    },
    "texas": {
        "name": "Texas",
        "capital": "Austin",
        "abbreviation": "TX",
        "cap population": 954000
    },
    "utah": {
        "name": "Utah",
        "capital": "Salt Lake City",
        "abbreviation": "UT",
        "cap population": 200000
    },
    "vermont": {
        "name": "Vermont",
        "capital": "Montpelier",
        "abbreviation": "VT",
        "cap population": 7000
    },
    "virginia": {
        "name": "Virginia",
        "capital": "Richmond",
        "abbreviation": "VA",
        "cap population": 228000
    },
    "washington": {
        "name": "Washington",
        "capital": "Olympia",
        "abbreviation": "WA",
        "cap population": 52000
    },
    "west virginia": {
        "name": "West Virginia",
        "capital": "Charleston",
        "abbreviation": "WV",
        "cap population": 47000
    },
    "wisconsin": {
        "name": "Wisconsin",
        "capital": "Madison",
        "abbreviation": "WI",
        "cap population": 255000
    },
    "wyoming": {
        "name": "Wyoming",
        "capital": "Cheyenne",
        "abbreviation": "WY",
        "cap population": 63000
    },
    "unknown":{
        "name": "unknown",
        "capital": "unknown",
        "abbreviation": "unknown",
        "cap population": 0
    }
}
app.get("/", (request, response)=>{
    response.sendFile(__dirname + "/index.html")
})

app.get("/api/states/:name", (request, response)=>{
    const stateName = request.params.name.toLowerCase()
    
    if(states[stateName]){
        response.json(states[stateName])
    }else{
        response.json(states["unknown"])
    }
    
})

app.get("/api/states", (request, response)=>{
    return response.json(states)
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Better go catch it!`)
})

/*"": {
        "capital": "",
        "abbreviation": "",
        "cap population": 0
    },*/