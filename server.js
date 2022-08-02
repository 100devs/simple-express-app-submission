const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const park = {
    'yellowstone':{
        'state': 'Wyoming',
        'size': '2.2 million acres',
        'dateFounded': '1872',
        'keyFeature': 'Old Faithful'
    },
    'arches':{
        'state': 'Utah',
        'size': '77,000 acres',
        'dateFounded': '1929',
        'keyFeature': 'Delicate Arch'
    },
    'unknown':{
        'state': 'Unknown',
        'size': 'Unknown',
        'dateFounded': 'Unknown',
        'keyFeature': 'Unknown'
    }
}

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (req,res)=>{
    const parkName = req.params.name.toLowerCase()
    if(park[parkName]){
        res.json(park[parkName])
    }else{
        res.json(park['unknown'])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT} betta go catch it!`)
})