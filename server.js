const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const members = {
    'Ji Seok Jin':{
        'age': 56,
        'birthName': 'Ji Seok Jin',
        'birthLocation': 'Gangwon, South Korea',
        'status': 'Current Member'
    },
    'Yoo Jae Suk':{
        'age': 49,
        'birthName': 'Yoo Jae Suk',
        'birthLocation': 'Seoul, South Korea',
        'status': 'Current Member'
    },
    'Kim Jong Kook':{
        'age': 46,
        'birthName': 'Kim Jong Kook',
        'birthLocation': 'Seoul, South Korea',
        'status': 'Current Member'
    },
    'Kang Gary':{
        'age': 44,
        'birthName': 'Kang Hee Gun',
        'birthLocation': 'South Korea',
        'status': 'Former Member'
    },
    'Ha Ha':{
        'age': 42,
        'birthName': 'Ha Dong Hoon ',
        'birthLocation': 'Baden-Wuttemberg, West Germany',
        'status': 'Current Member'
    },
    'Song Ji Hyo':{
        'age': 40,
        'birthName': 'Cheon Seong Im',
        'birthLocation': 'North Gyeongsang Province, South Korea',
        'status': 'Current Member'
    },
    'Lee Kwang Soo':{
        'age': 36,
        'birthName': 'Lee Kwang Soo',
        'birthLocation': 'Gyeonggi, South Korea',
        'status': 'Former Member'
    },
     'Lee So Min':{
        'age': 36,
        'birthName': 'Jeon So Min',
        'birthLocation': 'Gyeonggi, South Korea',
        'status': 'Current Member'
    },
    'Kang Se Chan':{
        'age': 35,
        'birthName': 'Yang Se Chan',
        'birthLocation': 'Gyeonggi, South Korea',
        'status': 'Current Member'
    },
    'unknown':{
        'age': 0,
        'birthName': 'Unknown',
        'birthLocation': 'Unknown',
        'status': 'Unknown'
    }
}
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:memberName', (req, res)=>{
    const membersName = request.params.memberName.toLowerCase()
    if(members[membersName]){
        response.json(members[membersName])
    }else{
        response.json(members['unknown'])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
})