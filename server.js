const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000;
require('dotenv').config()



const dbConnectionStr = process.env.DB_STRING,


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        const db = client.db('contact')
        const dbName = db.collection('contactList');


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    dbName
    .find()
    .sort({id: -1})
    .toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

 // handles client-side POST request from the form

app.post('/addNew', (request, response) => {
    dbName
    .insertOne(request.body
//       {devId: request.body.id,
//   devName:request.body.name,
// devEmail:request.body.email,
// devPhone:request.body.phone,
// devCity:request.body.city,
// devDesignation:request.body.designation,
// devLinkedin:request.body.linkedin,
// devTwitter:request.body.twitter,
// devnotes:request.body.notes}
)
    .then(result => {
        console.log('Contacts Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

//update the request
app.put('/addNew/:name', (request, response) => {

    dbName.
    // .findOneAndUpdate(
    //     { devName: request.body.name },

    updateOne(
      {
       //  devId:request.body.id,
       // devName:request.body.name,
        devEmail:request.body.email,
        devPhone:request.body.phone,
        devCompany: request.body.company,
      devDesignation: request.body.designation,
       devEmail: request.body.email,
       devPhone: request.body.phone,
       devCity: request.body.city,
      //  devLinkedin:request.body.linkedin,
      // devTwitter:request.body.twitter,
      //   devnotes:request.body.notes
     },
       {
        $set: {
          devCompany: request.body.company,
          devDesignation: request.body.designation,
          devEmail: request.body.email,
          devPhone: request.body.phone,
          devCity: request.body.city,
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Updated Contacts')
        response.json('Success')
    })
    .catch(error => console.error(error))

})

app.delete('/delete:name', (request, response) => {
     dbName
    .deleteOne({devName: request.body.name})
     .then(result => {
         if (results.deletedCount === 0) {
            return response.json(`No info to delete`);
          }
         console.log('contact Deleted')
         response.json('contact Deleted')
     })
     .catch(error => console.error(error))

 })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

});
