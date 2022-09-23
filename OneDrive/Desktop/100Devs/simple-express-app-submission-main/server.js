const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const { request } = require('http')
const PORT = 8000

app.use(cors())

const clubStadiums = {
    'unknown': {
        'clubName': 'unknown',
        'stadiumName': 'unknown',
        'stadiumBuilt': 'unknown',
        'stadiumCapacity': 'unknown',
        'image': 'unknown',
        'logoImage': 'unknown'
    },
    'manchester united': {
        'clubName': 'Manchester United',
        'stadiumName': 'Old Trafford',
        'stadiumBuilt': '1909',
        'stadiumCapacity': '75 811',
        'image': 'https://c8.alamy.com/comp/MH2XC3/aerial-view-of-old-trafford-stadium-home-to-manchester-united-fc-MH2XC3.jpg',
        'logoImage': 'https://logos-world.net/wp-content/uploads/2020/06/Red-Devils-logo.png'
    },
    'helsingborg': {
        'clubName': 'Helsingborgs IF',
        'stadiumName': 'Olympia',
        'stadiumBuilt': '1898',
        'stadiumCapacity': '16 500',
        'image': 'https://www.stadiumguide.com/wp-content/uploads/olympia_top1-1100x695.jpg',
        'logoImage': 'https://seeklogo.com/images/H/helsingborg-if-logo-FC3A9AE471-seeklogo.com.jpg'
    },
    'sporting': {
        'clubName': 'Sporting Club de Portugal',
        'stadiumName': 'Estadio Jose Alvalade',
        'stadiumBuilt': '2003',
        'stadiumCapacity': '50 095',
        'image': 'https://img.fcbayern.com/image/upload/t_cms-2x1/f_auto/w_1600,c_fill/q_auto/cms/public/images/fcbayern-com/homepage/stadien/lissabon_get_150820.jpg',
        'logoImage': 'https://banner2.cleanpng.com/20181112/sb/kisspng-sporting-cp-football-lisbon-sports-european-multis-sporting-clube-de-portugal-lion-bing-images-5bea4278c3c336.2782210215420790968019.jpg'
    },
    'aston villa': {
        'clubName': 'Aston Villa',
        'stadiumName': 'Villa Park',
        'stadiumBuilt': '1897',
        'stadiumCapacity': '42 682',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Villa_Park.jpg/800px-Villa_Park.jpg',
        'logoImage': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_UXr1zfzw7ostmdx0B2hYEVb621MkWttFXQ&usqp=CAU'
    },
    'newcastle jets': {
        'clubName': 'Newcastle United Jets',
        'stadiumName': 'McDonald Jones Stadium',
        'stadiumBuilt': '1970',
        'stadiumCapacity': '33 000',
        'image': 'https://www.austadiums.com/stadiums/photos/mcdonald-jones-stadium-matildas.jpg',
        'logoImage': 'https://seeklogo.com/images/N/newcastle-jets-logo-A7BBE2CBCF-seeklogo.com.png'
    },
    'malaga': {
        'clubName': 'Malaga CF',
        'stadiumName': 'La Rosaleda',
        'stadiumBuilt': '1941',
        'stadiumCapacity': '30 044',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Estado_de_la_Rosaleda_%28M%C3%A1laga_C.F.%29.jpg',
        'logoImage': 'https://banner2.cleanpng.com/20180528/pl/kisspng-mlaga-cf-la-liga-getafe-cf-fc-barcelona-5b0bee4865ceb9.095108191527508552417.jpg'
    },
    'la galaxy': {
        'clubName': 'Los Angeles Galaxy',
        'stadiumName': 'Dignity Health Sports Park',
        'stadiumBuilt': '2003',
        'stadiumCapacity': '27 000',
        'image': 'https://cdn.vox-cdn.com/thumbor/AgtJ_5bsQbErORlZPwQAFKr0ra0=/0x0:4000x2667/1200x800/filters:focal(1777x1019:2417x1659)/cdn.vox-cdn.com/uploads/chorus_image/image/70367490/1325408044.0.jpg',
        'logoImage': 'https://seeklogo.com/images/L/la-galaxy-2015-logo-CBDB400718-seeklogo.com.png'
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:clubName', (request, response) => {
    const clubsName = request.params.clubName.toLowerCase()
    if(clubStadiums[clubsName]){
        response.json(clubStadiums[clubsName])
    } else {
        response.json(clubStadiums['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running')
})