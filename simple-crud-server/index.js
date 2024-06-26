const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// biswasbittu98
// IA18SdUlD68ZQr9P



const uri = "mongodb+srv://biswasbittu98:IA18SdUlD68ZQr9P@cluster0.bod8guw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        await client.connect();

        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        //  Get Data From DB..........
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);

        });


        // Delete-from DataBase.......
        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            console.log("Please delete from Data Base:", id);
            const quary ={_id: new ObjectId(id)};
            const result = await userCollection.deleteOne(quary);
            res.send(result)

        });




        //    Send Data to clint Side
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new User:', user);
            const result = await userCollection.insertOne(user);
            res.send(result);


        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.log);




app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING');

});


app.listen(port, () => {
    console.log(`Simple crud is running on port: ${port}`);
})