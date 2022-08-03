// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from '../../lib/mongodb'


export default async (req, res) => {
  const client = await clientPromise
  const db = client.db('todo')
  let todos = await db.collection('todos').find({}).toArray()
  todos = JSON.stringify(todos)
  if (req.method == "GET") {
    res.status(200).json({ todos })
  }
  else if (req.method == ('POST' || 'PUT' )) {
    db.collection("todos").updateOne(
      {title : req.body.title},
      { $set: {
          title: req.body.title,
          text: req.body.text,
          completed : req.body.completed
      }},
      {
          upsert: true
      }
    )
    res.status(200).json('Success')
  }
  else if (req.method == 'DELETE') {
    db.collection("todos").deleteOne(
      {title:req.body.title}
    )
    res.json('Success')
  }
}
