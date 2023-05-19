const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app =express();
const port =process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xnjeavl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

      const toyCarCollection =client.db('toyCarDB').collection('toyCar');

    app.get('/toyCars', async(req, res)=>{
      const cursor = toyCarCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/toyCars/:id', async(req, res)=>{
      const id =req.params.id;
      const query ={_id: new ObjectId(id)}
      const result = await toyCarCollection.findOne(query);
      res.send(result)
    })

    app.get('/toyCars/email', async(req, res)=>{
      const cars =await toyCarCollection.find().toArray()
      res.send(cars)
      
    })

    app.post('/toyCars', async(req, res)=>{
      const newToyCar =req.body;
      console.log(newToyCar)
      const result = await toyCarCollection.insertOne(newToyCar)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Toy MarketPlace running')
})

app.listen(port, ()=>{
    console.log(`Toy MarketPlace is running on port ${port}`)
})