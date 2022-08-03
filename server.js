const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())


const plants = {
    'begonia maculata':{
        'light Requirements': 'Bright, indirect light.',
        'watering': 'Keep the soil generally moist, letting the top half inch of soil dry out between watering. Will not tolerate soggy soil.',
        'temperature': '65°F (18°C) and 86°F (30°C).',
        'humidity': 'High humidity. Around 45% or more is ideal.',
        'propagation': 'Stem cuttings are easily propagated in soil or water.'
    },
    'watermelon peperomia':{
        'light Requirements': 'Bright, indirect light.',
        'watering': 'Allow the couple of inches on the top to dry out between waterings.',
        'temperature': 'Warm conditions',
        'humidity': 'Ideally high humidity',
        'propagation': 'Easy to propogate. Can be propagated in two main ways: by division and by leaf cuttings.'
    },
    'string of hearts':{
        'light Requirements': 'Partial sun',
        'watering': 'Drought-tolernant, but likes frequent watering. Let soil dry between waterings.',
        'temperature': 'Can tolerate low and temps for short periods, but a warm temp is best.',
        'humidity': 'Ideally high humidity.',
        'propagation': 'Can easily be propagated. Tubers that form along the stem, and cuttings can easily yield new plants.'
    },
    'zz':{
        'light Requirements': 'Will tolerate low light, but will do best in bright to moderate light.',
        'watering': 'Water when soil has dried out.',
        'temperature': "Average temps, but does not like low temps for long.",
        'humidity': 'Fine with low humidity, but if home normally runs dry, a humidifier is recommended.',
        'propagation': 'Can be propagated by division and stem cuttings.'
    },
    'unknown':{
        'light Requirements': 'n/a',
        'watering': 'n/a',
        'temperature': 0,
        'humidity': 0,
        'propagation': 'n/a'
    }

}
app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')

})

app.get('/api/:name', (request, response)=>{
    const plantName =request.params.name.toLowerCase()
    if(plants [plantName]){
        response.json(plants[plantName])
    }else {
        response.json(plants['unknown'])
    }
})


app.listen(process.env.PORT || PORT, ()=>{
    console.log (`The server is running on port ${PORT}`)

})