// REQUIRE DEPENDENCIES
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const path=require("path");
const ejs=require("ejs");

app.use(cors())

// DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'hot-spring-db'


// MONGO CONNECT
MongoClient.connect(dbConnectionStr)
    .then(client =>{
        console.log('ITS CONNECTED, TO THE DATABASE');
        db = client.db(dbName)
    })


// SET MIDDLEWARE
app.set('view engine','ejs')
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', async (req,res) => {
    function comparator(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
      }
    let data =  await db.collection('hot-spring-col').find().toArray()
    
       let arrList = data.map((x)=> `${x.name}--${x.description}--${x.area}--${x.state}`)
       arrList = arrList.map((x) => x.split('--'))
       arrList = arrList.sort((comparator))
       let nameList = data.map((x)=> x.name)
       let descList = data.map((x)=> x.description)
       let areaList = data.map((x)=> x.area)
       let stateList = data.map((x)=> x.state)
    //    console.log(arrList);
       res.render('index', {allInfo: arrList, nameInfo: nameList, descInfo: descList, areaInfo: areaList, stateInfo: stateList})
})

app.get('/map/data', async (req,res) =>{
    console.log('map req started');
    let allApiData = await db.collection('hot-spring-col').find().toArray()
    res.send(allApiData)

})

app.get('/:link', async (req,res) => {
    let fileList = ['about', 'contact', 'services', 
    'blogsinglepost', 'blogpage2', 'portofolio3', 'map']

    const newPageLink = req.params.link
    if(fileList.includes(newPageLink)){
    return res.render(__dirname + `/views/${newPageLink}.ejs`);
    }

    let data =  await db.collection('hot-spring-col').find().toArray()
        let currSiteLink = data.filter((x) => x.nospacename == newPageLink)
        currSiteLink = currSiteLink[0]
        // console.log(currSiteLink);
        res.render('portofoliodetail', {siteObj: currSiteLink});
})

app.post('/api/nearest', async (req, res) => {
    console.log('POST GOT');
    const {  lng, lat } = req.body
    // console.log({lng, lat}); ''
    results = await db.collection('hot-spring-col').find({
    loc: {
        $near:{
        $geometry: {type: "Point", coordinates: [ lng, lat ],},
        // 500mi = 804672meter  150mi = 241402meter 50mi = 80467.2 10mi=1609.34 5=8046.72
        $maxDistance: 804672}
    }
    }).toArray()
    res.send(results)
  })


  
    // ******************************************************
    // **if $near doesnot work**
    // config.set("displayBatchSize",300)
    // db.collection('hot-spring-col').find({
    //   loc: {
    //      $geoWithin: { $centerSphere: [ [ lng, lat ], 100/3963.2 ] }
    //          }
    // }).toArray()
    // .then(results => {
    //     console.log(results)
    //     res.send(results)
    // })






// SET UP LOCALHOST
app.listen(process.env.PORT || PORT, () => {
    console.log('SERVER ONLINE MAINFRAME');
})