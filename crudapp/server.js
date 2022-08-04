const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())

let phones = [
    { 
              "id": 1,
                  "name": "Arto Hellas", 
                  "number": "040-123456"
            
    },
    { 
              "id": 2,
              "name": "Ada Lovelace", 
              "number": "39-44-5323523"
            
    },
    { 
              "id": 3,
              "name": "Dan Abramov", 
              "number": "12-43-234345"
            
    },
    { 
              "id": 4,
              "name": "Mary Poppendieck", 
              "number": "39-23-6423122"
            
    }
]

const unknownEndpoint = (req,res) => {
    res.status(404).send({error: 'unkonwn endpoint'})
}

app.use(morgan(function (tokens, req, res) {
    let logg = [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
          
    ]
    if(tokens.method(req,res)=='POST'){
        logg.push(tokens.postreq(req,res))
    }else{
        morgan.token('postreq', function(req,res) {
             return ''
    })
    }
    return logg.join(' ')
    
}))
app.get('/api/persons',(req, res)=>{
    res.json(phones)
})

function countPhonesDate(){
    let count = Math.max(...phones.map(n=>n.id))
    return `<p>Phonebook has info for ${count} people<p>
        <p>${new Date()}<p>`
}

app.get('/',(req, res)=>{
    res.send(countPhonesDate())
})


app.get('/api/persons/:id',(req, res)=>{
    const id = req.params.id
    const phone = phones.find(phone => phone.id == id)
    if(phone){
        res.json(phone)
    } else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    phones = phones.filter(phone => phone.id != id)
    res.status(204).end()
})

function randId(){
    return Math.floor(Math.random()*10000)
}

app.post('/api/persons', (req,res) =>{
    const body = req.body
    if(!body.name||!body.number){
        return res.status(400).json({
            error: 'content missing'
        })
    }
    else if(phones.filter(e=>e.name == body.name).length>0){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const phone = {
        id: randId(),
        name: body.name,
        number: body.number
    }
    morgan.token('postreq', function(req,res) {
        return JSON.stringify(phone)
    })
    phones = phones.concat(phone)
    res.json(phone)
})
app.use(unknownEndpoint)

const PORT = 8000 
app.listen( process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
