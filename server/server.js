require('dotenv').config() 

const express = require('express')
const app = express()

app
  .use(express.urlencoded({extended: true})) 
  .use(express.static('static'))             
  .set('view engine', 'ejs')      
  .set('views', 'view')   

app
    .get('/registreren', showRegistrerenForm)
    .post('/create-account', addUser)
    .listen(8511)


// VERBINDING MET DE DATABASE

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
})

client.connect()
  .then(() => {
    console.log('Database connection established')
  })
  .catch((err) => {
    console.log(`Database connection error - ${err}`)
    console.log(`For uri - ${uri}`)
  })



// ROUTE FUNCTIES

function showRegistrerenForm(req, res){
    res.render('registreren.ejs')
}

function addAccount(req, res){
	
	res.render('account.ejs', { 
        naam: req.body.naam,
        wachtwoord: req.body.wachtwoord,
        geboortedatum: req.body.geboortedatum
    });
	}

const db = client.db(process.env.DB_NAME)
const collection = db.collection(process.env.DB_COLLECTION)

async function addUser(req, res){
    result = await collection.insertOne({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    console.log(`Added with _id: ${result.insertedID}`)
    res.render("added.ejs", {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
}