const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
let cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
let stripe = require('stripe')(process.env.PAYMENT_SEC)
let jwt = require('jsonwebtoken');

app.use(cors())
app.use(express.json())

let verifyJWT = (req, res, next) => {

  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SEC, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access to' })
    }
    req.decoded = decoded;
    next();
  })

}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5nj1o0g.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,

  }
});




async function run() {
  try {

    await client.connect();

    let verifyAdmin = async (req, res, next) => {

      let email = req.decoded.email;
      let query = { email: email }
      let user = await userscollection.findOne(query);
      if (user?.role !== 'admin') {
        return res.status(403).send({ error: true, message: 'Forbiden' })
      }
      next();
    }

    const database = client.db("Bristodb");
    const Bridtocollection = database.collection("menu");
    const cartcollection = client.db("Bristodb").collection("cart");
    const userscollection = client.db("Bristodb").collection("users");
    const paycollection = client.db("Bristodb").collection("payment");

    app.post('/jwt', (req, res) => {
      let body = req.body;
      let token = jwt.sign(body, process.env.ACCESS_TOKEN_SEC, { expiresIn: '1h' })

      res.send({ token })

    })


    //payment related code
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const { price } = req.body;

      let amount = price * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });


      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post('/pay', verifyJWT, async (req, res) => {

      let pay = req.body;
      let result = await paycollection.insertOne(pay)
      let query = { _id: { $in: pay.cartitemid.map(id => new ObjectId(id)) } }
      let deresult = await cartcollection.deleteMany(query);
      res.send({ result, deresult })
    })


    app.post('/users', async (req, res) => {
      let item = req.body;
      let query = { email: item.email }
      let existcoll = await userscollection.findOne(query);
      if (existcoll) {
        return res.send({ message: 'already exist' })
      }
      const result = await userscollection.insertOne(item);
      res.send(result);

    })

    app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
      const result = await userscollection.find().toArray();
      res.send(result);

    })


    app.get('/users/admin/:email', verifyJWT, async (req, res) => {
      let email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }
      let query = { email: email }
      let user = await userscollection.findOne(query);
      let result = { admin: user?.role === 'admin' }
      res.send(result)
    })


    app.patch('/users/admin/:id', async (req, res) => {
      let id = req.params.id;
      let filter = {
        _id: new ObjectId(id)
      }
      let update = {
        $set: {
          role: 'admin'
        },
      }
      let result = await userscollection.updateOne(filter, update);
      res.send(result)
    })

    app.delete('/users/admin/:id', async (req, res) => {
      let id = req.params.id;
      let query = { _id: new ObjectId(id) }
      const result = await userscollection.deleteOne(query);
      res.send(result);

    })
    app.get('/menu', async (req, res) => {
      let result = await Bridtocollection.find().toArray()
      res.send(result)

    })

    app.post('/menu', verifyJWT, verifyAdmin, async (req, res) => {
      const newItem = req.body;
      const result = await Bridtocollection.insertOne(newItem)
      res.send(result);
    })



    app.delete('/menu/:id', verifyJWT, verifyAdmin, async (req, res) => {
      let id = req.params.id;
      let query = { _id: new ObjectId(id) }

      let result = await Bridtocollection.deleteOne(query);
      res.send(result)

    })

    app.post('/cart', async (req, res) => {

      let item = req.body;

      const result = await cartcollection.insertOne(item);
      res.send(result);

    })
    app.get('/cart', async (req, res) => {
      let email = req.query.email;

      if (!email) {
        res.send([])
      }
      // let decodeEmail=req.decoded.email;

      // if (email !== decodeEmail) {
      //   return res.status(403).send({error: true, message:'Forbiden'})

      // }
      let query = { email: email }
      const result = await cartcollection.find(query).toArray();
      res.send(result);

    })
    app.delete('/cart/:id', async (req, res) => {
      let id = req.params.id;
      let query = { _id: new ObjectId(id) }
      const result = await cartcollection.deleteOne(query);
      res.send(result);

    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('bristo World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})