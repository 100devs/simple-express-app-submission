const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
const axios = require('axios');
const puppeteer = require('puppeteer');
const schedule = require('node-schedule');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'stocks';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    });

app.get('/', async (req, res) => {
    const boughtStocks = await db.collection('boughtStocks').find().toArray();
    res.render('index.ejs', {boughtStocks: boughtStocks});
});
class Stock {
    constructor(symbol, score, price, date){
        this.symbol = symbol;
        this.score = score;
        this.price = price;
        this.date = date;
    }
}

app.post('/addboughtStock', (request, response) => {
    db.collection('boughtStocks').insertOne({sticker: request.body.sticker, price: request.body.price})
    .then(result => {
        response.redirect('/');
    })
    .catch(error => console.error(error));
});

app.put('/updateboughtStock', (request, response) => {
    db.collection('boughtStocks').updateOne({sticker: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        response.json('Marked Complete');
    })
    .catch(error => console.error(error));
});

app.delete('/deleteboughtStock', (request, response) => {
    db.collection('boughtStocks').deleteOne({sticker: request.body.sticker, price: request.body.price})
    .then(result => {
        response.json('Todo Deleted');
    })
    .catch(error => console.error(error));
});

app.get('/stock/:stockName', (req, res) => {
    const stockName = req.params.stockName.toLowerCase()
    if(stockName !== ""){
        const axiosOptions ={
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
              'X-API-KEY': process.env.YF_API_KEY
            }
        };
        const url = 'https://yfapi.net/v6/finance/quote?region=US&lang=eng&symbols=' + stockName;
        axios.get(url, axiosOptions)
            .then(response => {
                const objToJson = {
                    price: response.data.quoteResponse.result[0].regularMarketPrice,
                    exchange: response.data.quoteResponse.result[0].fullExchangeName,
                    name: response.data.quoteResponse.result[0].longName
                }
                return res.json(objToJson);
            })
            .catch(error => {
                res.json({error: "Stock not found"});
        });
    }else{
        res.json({err: "No stock entered"});
    }  
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

const job = schedule.scheduleJob('0 30 9,15 ? * MON,TUE,WED,THU,FRI *', scrapeDayminer);

async function scrapeDayminer(){
    //Get hyped reddit stock list
    console.log("Starting scraping process");
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('https://dayminer.herokuapp.com/');
    const grid = await page.waitForSelector("#dynamic");
  
    var stockScoreDateArray = await page.evaluate(element => {
        let child = element.childNodes;
        let arr = [];
        child.forEach( (e, i) =>{
            if(e.classList.contains('symbol-col')){
                const symbol = e.textContent
                const score = child[i+1].textContent;
                
                arr.push({symbol: symbol, score: score});
            }
        });
        return arr;
    }, grid);
    browser.close();

    //Get stock price
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let tod = "";
    if(hours > 12){
        tod = "pm";
    }else{
        tod = "am";
    }
    const dateOfRetrieval = year + "-" + month + "-" + date + " " + tod;
    
    stockScoreDateArray = stockScoreDateArray.filter( e => e.score > 10)
        .map( e => new Stock(e.symbol, e.score, 0, dateOfRetrieval));
    
    const intervalId = setInterval( async () => {
        if(stockScoreDateArray.length > 0){
            let stock = stockScoreDateArray.shift();
            stock.price = await getStockPrice(stock.symbol);
            if(stock.score > 200){
                db.collection('stockScoreGreater200').insertOne(stock)
                    .catch(error => console.error(error));
            }else if (stock.score > 50){
                db.collection('stockScoreGreater50').insertOne(stock)
                    .catch(error => console.error(error));
            }else{
                db.collection('stockScoreGreater10').insertOne(stock)
                    .catch(error => console.error(error));
            }
        }else{
            clearInterval(intervalId);
            console.log("Finished inserting stocks");
        }
    },10000, stockScoreDateArray);
    
}
async function getStockPrice(symbol){
    const url = 'https://api.twelvedata.com/price?symbol=' + symbol + '&apikey=' + process.env.TWELVE_DATA_API_KEY;
    let res = await axios.get(url);
    price = res.data.price;
    return price;
}