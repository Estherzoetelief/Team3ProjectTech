require('dotenv').config() 

const express = require('express')
const app = express()


app
  .use(express.urlencoded({extended: true})) 
  .use(express.static('static'))            
  .set('view engine', 'ejs')      
  .set('views', 'view')   

app
    .get('/register', showRegisterPage)
    .get('/sign-in', showSignInPage)

    .post('/log-in', signIn)
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

const db = client.db(process.env.DB_NAME)
const collection = db.collection(process.env.DB_COLLECTION)









// ROUTE FUNCTIES

function showRegisterPage(req, res){
    res.render('signUp.ejs')
}

function showSignInPage(req, res){
    res.render('signIn.ejs')
}





// CHECKEN OF DE INLOG GEGEVENS KLOPPEN

async function signIn(req, res) {
  try {
    const userInput = await collection.findOne({email: req.body.email });

    if (userInput && userInput.password === req.body.password ) {
      res.render("home.ejs", {
        name: userInput.name,
        username: userInput.username,
        email: req.body.email,
        password: req.body.password
    })
    } else {
      console.log("Invalid username or password")
    }
  } catch (error) {
    console.error(error);
    res.send('Error during login');
  }
}
















// NIEUWE GEBRUIKER TOEVOEGEN AAN DE DATABASE

async function addUser(req, res){
    result = await collection.insertOne({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    console.log(`Added with _id: ${result.insertedID}`)
    res.render("home.ejs", {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
}
