const express=require('express')
const route = express.Router()

const services = require('../services/render')
const controller=require('../controller/controller')

route.get('/',services.homeRoutes)

route.get('/add-user',services.add_user)

route.get('/update-user',services.update_user)

//API
route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

module.exports=route