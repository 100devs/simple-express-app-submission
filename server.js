const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const parks = {
    'acadia' : {
        'location': 'Maine',
        'dateEstablished': 'February 26, 1919',
        'areaInAcres': 49071,
        'annualRecreationVisitors': 4069098,
    },
    'american samoa' : {
        'location': 'American Samoa',
        'dateEstablished': 'October 31, 1988',
        'areaInAcres': 8257,
        'annualRecreationVisitors': 8495,
    },
    'arches' : {
        'location': 'Utah',
        'dateEstablished': 'November 12, 1971',
        'areaInAcres': 76679,
        'annualRecreationVisitors': 1806865,
    },
    'badlands' : {
        'location': 'South Dakota',
        'dateEstablished': 'November 10, 1978',
        'areaInAcres': 242756,
        'annualRecreationVisitors': 1224226,
    },
    'big bend' : {
        'location': 'Texas',
        'dateEstablished': 'June 12, 1944',
        'areaInAcres': 801163,
        'annualRecreationVisitors': 581220,
    },
    'biscayne' : {
        'location': 'Florida',
        'dateEstablished': 'June 28, 1980',
        'areaInAcres': 172971,
        'annualRecreationVisitors': 705655,
    },
    'black canyon of the gunnison' : {
        'location': 'Colorado',
        'dateEstablished': 'October 21, 1999',
        'areaInAcres': 30780,
        'annualRecreationVisitors': 308910,
    },
    'bryce canyon' : {
        'location': 'Utah',
        'dateEstablished': 'February 25, 1928',
        'areaInAcres': 35835,
        'annualRecreationVisitors': 2104600,
    },
    'canyonlands' : {
        'location': 'Utah',
        'dateEstablished': 'September 12, 1964',
        'areaInAcres': 337598,
        'annualRecreationVisitors': 911594,
    },
    'capitol reef' : {
        'location': 'Utah',
        'dateEstablished': 'December 18, 1971',
        'areaInAcres': 241905,
        'annualRecreationVisitors': 1405353,
    },
    'carlsbad caverns' : {
        'location': 'New Mexico',
        'dateEstablished': 'May 14, 1930',
        'areaInAcres': 46766,
        'annualRecreationVisitors': 349244,
    },
    'channel islands' : {
        'location': 'California',
        'dateEstablished': 'March 5, 1980',
        'areaInAcres': 249561,
        'annualRecreationVisitors': 319252,
    },
    'congaree' : {
        'location': 'South Carolina',
        'dateEstablished': 'November 10, 2003',
        'areaInAcres': 26693,
        'annualRecreationVisitors': 215181,
    },
    'crater lake' : {
        'location': 'Oregon',
        'dateEstablished': 'May 22, 1902',
        'areaInAcres': 183224,
        'annualRecreationVisitors': 647751,
    },
    'cuyahoga valley' : {
        'location': 'Ohio',
        'dateEstablished': 'October 11, 2000',
        'areaInAcres': 32572,
        'annualRecreationVisitors': 2575275,
    },
    'death valley' : {
        'location': 'California, Nevada',
        'dateEstablished': 'October 31, 1994',
        'areaInAcres': 3408396,
        'annualRecreationVisitors': 1146551,
    },
    'denali' : {
        'location': 'Alaska',
        'dateEstablished': 'Februrary 26, 1917',
        'areaInAcres': 4740911,
        'annualRecreationVisitors': 229521,
    },
    'dry tortugas' : {
        'location': 'Florida',
        'dateEstablished': 'October 26, 1992',
        'areaInAcres': 64701,
        'annualRecreationVisitors': 83817,
    },
    'everglades' : {
        'location': 'Florida',
        'dateEstablished': 'May 30, 1934',
        'areaInAcres': 1508939,
        'annualRecreationVisitors': 942130,
    },
    'gates of the arctic' : {
        'location': 'Alaska',
        'dateEstablished': 'December 2, 1980',
        'areaInAcres': 7523897,
        'annualRecreationVisitors': 7362,
    },
    'gateway arch' : {
        'location': 'Missouri',
        'dateEstablished': 'February 22, 2018',
        'areaInAcres': 91,
        'annualRecreationVisitors': 1145081,
    },
    'glacier': {
        'location': 'Montana',
        'dateEstablished': 'May 11, 1910',
        'areaInAcres': 1013126,
        'annualRecreationVisitors': 3081656,
    },
    'glacier bay': {
        'location': 'Alaska',
        'dateEstablished': 'December 2, 1980',
        'areaInAcres': 3223383,
        'annualRecreationVisitors': 89768,
    },
    'grand canyon': {
        'location': 'Arizona',
        'dateEstablished': 'February 26, 1919',
        'areaInAcres': 1201647,
        'annualRecreationVisitors': 4532677,
    },
    'grand teton': {
        'location': 'Wyoming',
        'dateEstablished': 'February 26, 1929',
        'areaInAcres': 310044,
        'annualRecreationVisitors': 3885230,
    },
    'great basin': {
        'location': 'Nevada',
        'dateEstablished': 'October 27, 1986',
        'areaInAcres': 77180,
        'annualRecreationVisitors': 144875,
    },
    'great sand dunes': {
        'location': 'Colorado',
        'dateEstablished': 'September 24, 2004',
        'areaInAcres': 107346,
        'annualRecreationVisitors': 602613,
    },
    'great smokey mountains': {
        'location': 'North Carolina, Tennessee',
        'dateEstablished': 'June 15, 1934',
        'areaInAcres': 522427,
        'annualRecreationVisitors': 14161548,
    },
    'guadalupe mountains': {
        'location': 'Texas',
        'dateEstablished': 'Ocotber 15, 1966',
        'areaInAcres': 86367,
        'annualRecreationVisitors': 243291,
    },
    'haleakala': {
        'location': 'Hawaii',
        'dateEstablished': 'July 1 1961',
        'areaInAcres': 33265,
        'annualRecreationVisitors': 853181,
    },
    'hawaii volcanoes': {
        'location': 'Hawaii',
        'dateEstablished': 'August 1 1916',
        'areaInAcres': 325605,
        'annualRecreationVisitors': 1262747,
    },
    'hot springs': {
        'location': 'Arkansas',
        'dateEstablished': 'March 4, 1921',
        'areaInAcres': 5554,
        'annualRecreationVisitors': 2162884,
    },
    'indiana dunes': {
        'location': 'Indiana',
        'dateEstablished': 'February 15, 2019',
        'areaInAcres': 15349,
        'annualRecreationVisitors': 3177210,
    },
    'isle royale': {
        'location': 'Michigan',
        'dateEstablished': 'April 3, 1940',
        'areaInAcres': 571790,
        'annualRecreationVisitors': 25844,
    },
    'joshua tree': {
        'location': 'California',
        'dateEstablished': 'October 31, 1994',
        'areaInAcres': 795156,
        'annualRecreationVisitors': 3064400,
    },
    'katmai': {
        'location': 'Alaska',
        'dateEstablished': 'December 2, 1980',
        'areaInAcres': 3674529,
        'annualRecreationVisitors': 24764,
    },
    'kenai fjords': {
        'location': 'Alaska',
        'dateEstablished': 'December 2, 1980',
        'areaInAcres': 669650,
        'annualRecreationVisitors': 411782,
    },
    'kings canyon': {
        'location': 'California',
        'dateEstablished': 'March 4, 1940',
        'areaInAcres': 461901,
        'annualRecreationVisitors': 562918,
    },
    'kobuk valley': {
        'location': 'Alaska',
        'dateEstablished': 'December 2, 1980',
        'areaInAcres': 1750716,
        'annualRecreationVisitors': 11540,
    },
    'lake clark': {
        'location': 'Alaska',
        'dateEstablished': 'December 2, 1980',
        'areaInAcres': 2619816,
        'annualRecreationVisitors': 18278,
    },
    'lassen volcanic': {
        'location': 'California',
        'dateEstablished': 'August 9, 1916',
        'areaInAcres': 106589,
        'annualRecreationVisitors': 359635,
    },
    'mammoth cave': {
        'location': 'Kentucky',
        'dateEstablished': 'July 1, 1941',
        'areaInAcres': 54016,
        'annualRecreationVisitors': 515774,
    },
    'mesa verde': {
        'location': 'Colorado',
        'dateEstablished': 'June 29, 1906',
        'areaInAcres': 54485,
        'annualRecreationVisitors': 548477,
    },
    'mount rainier': {
        'location': 'Washington',
        'dateEstablished': 'March 2, 1899',
        'areaInAcres': 236382,
        'annualRecreationVisitors': 1670063,
    },
    'new river gorge': {
        'location': 'West Virginia',
        'dateEstablished': 'December 27, 2020',
        'areaInAcres': 72346,
        'annualRecreationVisitors': 1682720,
    },
    'north cascades': {
        'location': 'Washington',
        'dateEstablished': 'October 2, 1968',
        'areaInAcres': 504781,
        'annualRecreationVisitors': 17855,
    },
    'olympic': {
        'location': 'Washington',
        'dateEstablished': 'June 29, 1938',
        'areaInAcres': 922649,
        'annualRecreationVisitors': 2718925,
    },
    'petrified forest': {
        'location': 'Arizona',
        'dateEstablished': 'December 9, 1962',
        'areaInAcres': 221390,
        'annualRecreationVisitors': 590334,
    },
    'pinnacles': {
        'location': 'California',
        'dateEstablished': 'January 10, 2013',
        'areaInAcres': 26686,
        'annualRecreationVisitors': 348857,
    },
    'redwood': {
        'location': 'California',
        'dateEstablished': 'October 2, 1968',
        'areaInAcres': 138999,
        'annualRecreationVisitors': 435879,
    },
    'rocky mountain': {
        'location': 'Colorado',
        'dateEstablished': 'January 26, 1915',
        'areaInAcres': 265807,
        'annualRecreationVisitors': 4434848,
    },
    'saguaro': {
        'location': 'Arizona',
        'dateEstablished': 'October 14, 1994',
        'areaInAcres': 92867,
        'annualRecreationVisitors': 1079786,
    },
    'sequoia': {
        'location': 'California',
        'dateEstablished': 'September 25, 1890',
        'areaInAcres': 404063,
        'annualRecreationVisitors': 1059548,
    },
    'shenandoah': {
        'location': 'Virginia',
        'dateEstablished': 'December 26, 1935',
        'areaInAcres': 200192,
        'annualRecreationVisitors': 1592312,
    },
    'theodore roosevelt': {
        'location': 'North Dakota',
        'dateEstablished': 'November 10, 1978',
        'areaInAcres': 70447,
        'annualRecreationVisitors': 796085,
    },
    'virgin islands': {
        'location': 'U.S. Virgin Islands',
        'dateEstablished': 'August 2, 1956',
        'areaInAcres': 15052,
        'annualRecreationVisitors': 323999,
    },
    'voyageurs': {
        'location': 'Minnesota',
        'dateEstablished': 'April 8, 1975',
        'areaInAcres': 218222,
        'annualRecreationVisitors': 243042,
    },
    'white sands': {
        'location': 'New Mexico',
        'dateEstablished': 'December 20, 2019',
        'areaInAcres': 146344,
        'annualRecreationVisitors': 782469,
    },
    'wind cave': {
        'location': 'South Dakota',
        'dateEstablished': 'January 9, 1903',
        'areaInAcres': 33970,
        'annualRecreationVisitors': 709001,
    },
    'wrangel - st. elias': {
        'location': 'Alaska',
        'dateEstablished': 'December 2, 1980',
        'areaInAcres': 8323146,
        'annualRecreationVisitors': 50189,
    },
    'yellowstone': {
        'location': 'Wyoming, Montana, Idaho',
        'dateEstablished': 'March 1 1872',
        'areaInAcres': 2219791,
        'annualRecreationVisitors': 4860242,
    },
    'yosemite': {
        'location': 'California',
        'dateEstablished': 'October 1, 1890',
        'areaInAcres': 761747,
        'annualRecreationVisitors': 3287595,
    },
    'zion': {
        'location': 'Utah',
        'dateEstablished': 'November 19, 1919',
        'areaInAcres': 147242,
        'annualRecreationVisitors': 5039835,
    },
    'unknown': {
        'location': 'unknown',
        'dateEstablished': 'unknown',
        'areaInAcres': 'unknown',
        'annualRecreationVisitors': 'unknown',
    },
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request, response)=>{
    const parkName = request.params.name.toLowerCase()
    if (parks[parkName]) {
        response.json(parks[parkName])
    } else {
        response.json([parks['unknown']])
    }
    //response.json(parks)
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`The server is running on port ${PORT}`)
})