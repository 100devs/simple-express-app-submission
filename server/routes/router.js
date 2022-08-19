const express = require('express')
const route = express.Router() 

//routes

const controller = require('../controller/controller');

const axios = require('axios')

//home route
route.get('/',(req,res) =>{
    //make a get request to api/users
    axios.get('https://fresh-grocery.herokuapp.com/api/item')
        .then(function(response){
            console.log(response.data)
            res.render('index',{item: response.data});
        })
        .catch(err =>{
            res.send(err);
        })
})

//add item route
route.get('/add-item',(req,res) =>{
    res.render('add-item');
})

//update item route
route.get('/update-items',(req,res) =>{
    axios.get('https://fresh-grocery.herokuapp.com/api/item', {params: {id: req.query.id}})
    .then(function(itemdata){
        res.render('update-items', {item: itemdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
})

//API
route.post('/api/item', controller.create);
route.get('/api/item', controller.find);
route.post('/api/item/:id', controller.update);
route.delete('/api/item/:id', controller.delete);

module.exports = route