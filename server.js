const express = require('express');
const app = express();

const PORT = 3000

app.use(express.json())

const bossPedals = [
    {
        name: "distortion / overdrive",
        code: "os-2",
        type: ["overdrive", "distortion"],
        dateRange: {
            start: "1990",
            stop: "present"
        }
    },
    {
        name: "overdrive",
        code: "od-3",
        type: ["overdrive"],
        dateRange: {
            start: "1997",
            stop: "present"
        }
    },
    {
        name: "turbo overdrive",
        code: "od-2r",
        type: ["overdrive"],
        dateRange: {
            start: "1994",
            stop: "1999"
        }
    },
    {
        name: "dual overdrive",
        code: "sd-2",
        type: ["overdrive"],
        dateRange: {
            start: "1993",
            stop: "1998"
        }
    },
    {
        name: "turbo overdrive",
        code: "od-2",
        type: ["overdrive"],
        dateRange: {
            start: "1985",
            stop: "1994"
        }
    },
    {
        name: "super overdrive",
        code: "sd-1",
        type: ["overdrive", "distortion"],
        dateRange: {
            start: "1981",
            stop: "present"
        }
    },
]

const noData = {
    message: "Pedal not found"
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/js/main.js', (request, response) => {
    response.sendFile(__dirname + '/js/main.js')
})

app.get('/api/pedals/', (request, response) => {
    response.json(bossPedals)
})

app.get('/api/pedals/:pedalCode', (request, response) => {
    const pedal = request.params.pedalCode.toLowerCase()
    const data = bossPedals.find(boss => boss.code === pedal)
    response.json(data ? data : noData)
})

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})