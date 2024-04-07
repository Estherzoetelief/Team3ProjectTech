require('dotenv').config()

const express = require('express')
const app = express()
const session = require('express-session')

const multer = require('multer')
const upload2 = multer({ dest: 'static/upload/' })

// const gebruikersnaam = 'TestUser_newacc'

// VERBINDING MET DE DATABASE

const { MongoClient, ServerApiVersion } = require('mongodb')
// const {} = require('process')
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const loginName = ''

const db = client.db(process.env.DB_NAME)
const db2 = client.db(process.env.DB_NAME2)
const collection = db.collection(process.env.DB_COLLECTION)
const collection2 = db.collection(process.env.DB_COLLECTION2)

client.connect()
  .then(() => {
    console.log('Database connection established')
  })
  .catch((err) => {
    console.log(`Database connection error - ${err}`)
    console.log(`For uri - ${uri}`)
  })

// / Middleware voor bestand uploaden met Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // Bouw het bestandspad op basis van de originele bestandsnaam en een unieke identifier
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage })

// MongoDB connectie maken en server starten
async function startServer () {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect()
    console.log('Database connection established')

    // Start de Express server nadat de MongoDB-verbinding is vastgesteld
    // app.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (err) {
    console.error(`Database connection error: ${err}`)
  }
}
startServer()

app
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))
  .use(express.urlencoded({ extended: true }))
  .use(express.static('static'))
  .use(express.static('uploads'))
  .set('view engine', 'ejs')
  .set('views', 'view')

app
  .get('/register', showRegisterPage)
  .get('/sign-in', showSignInPage)
  //  .get('/portfolio', showPortfolioPage)
  .post('/log-in', signIn)
  .post('/create-account', upload2.single('profilePicture'), addUser)

  .get('/create-request', createRequest)
  .post('/send-request', upload2.array('images', 6), addRequest)

  .get('/find-requests', showRequests)

  .get('/discover', showDiscoverPage)
  .get('/detail', showDetailPage)
  .get('/', showLandingPage)
  .listen(8511)

// / MongoDB-collectie voor afbeeldingspaden
// const imagePathsCollection = client.db('ProjectTechApp').collection('portfolio_uploads');
const imagePathsCollection = db2.collection(process.env.DB_COLLECTION3)

app.get('/portfolio', async (req, res) => {
  try {
    const gebruikersnaam = 'TestUser_newacc'
    const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam })
    let imagePaths = []
    if (existingDataItem) {
      // Haal alleen de bestandsnamen op en voeg ze toe aan imagePaths
      imagePaths = existingDataItem.images.map(({ filename }) => filename)
    }
    const requestList = await collection2.find({ creator: req.session.user.username }).toArray()
    res.render('portfolio.ejs', {
      username: req.session.user.username,
      profile_picture: req.session.user.profile_picture,
      requests: requestList,
      session: req.session,
      imagePaths
    })
    // res.render('portfolio', { imagePaths: imagePaths });
  } catch (error) {
    console.error('Error fetching user images from database:', error)
    res.status(500).send('Error fetching user images from database')
  }
})

// Route voor het verwerken van het uploaden van afbeeldingen
app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
  try {
    const gebruikersnaam = 'TestUser_newacc'
    const fileContext = req.files.map(file => ({
      filename: file.filename
    //   filename: file.originalname
    //   , filepath: file.path
    }))
    const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam })
    if (existingDataItem) {
      const updatedImages = [...existingDataItem.images, ...fileContext]
      await imagePathsCollection.updateOne(
        { username: gebruikersnaam },
        { $set: { images: updatedImages } }
      )
      //   console.log('Images added to existing data item:', updatedImages);
      console.log('Images added to existing data item. File context:', updatedImages)
    } else {
      await imagePathsCollection.insertOne({ username: gebruikersnaam, images: fileContext })
      console.log('New data item created with images. File context:', fileContext)
    }
    res.redirect('/portfolio')
  } catch (err) {
    console.error('Error uploading files:', err)
    res.status(500).send('Error uploading files')
  }
})

// In de context van softwareontwikkeling staat "fs" voor "File System". 
// Het is een ingebouwde module in Node.js die functionaliteit biedt om met het 
// bestandssysteem van het besturingssysteem te werken. Met behulp van de "fs" 
// module kun je bestanden lezen, schrijven, bewerken, verplaatsen, hernoemen, 
// verwijderen en meer.

// enkele veelgebruikte functies van de "fs" module:
// fs.readFile(): Leest een bestand asynchroon.
// fs.readFileSync(): Leest een bestand synchronisch.
// fs.writeFile(): Schrijft gegevens naar een bestand asynchroon.
// fs.writeFileSync(): Schrijft gegevens naar een bestand synchronisch.
// fs.readdir(): Leest de inhoud van een map asynchroon.
// fs.readdirSync(): Leest de inhoud van een map synchronisch.
// fs.stat(): Geeft informatie over een bestand of map asynchroon.
// fs.existsSync(): Controleert of een bestand of map bestaat.

const fs = require('fs')
const path = require('path')

// Route voor het verwijderen van een afbeelding
app.delete('/delete-image/:imagePath', async (req, res) => {
  try {
    const gebruikersnaam = 'TestUser_newacc'
    const imagePath = req.params.imagePath
    // Verwijder de afbeelding van de webserver
    fs.unlinkSync(path.join(__dirname, 'uploads', imagePath))
    // fs.unlinkSync: Dit is een methode van de fs module die wordt gebruikt 
    // om een bestand te verwijderen. Het woord "Sync" betekent dat deze bewerking 
    // synchroon wordt uitgevoerd, wat betekent dat de uitvoering van de code wordt 
    // geblokkeerd totdat het bestand is verwijderd.

    // Verwijder de afbeelding uit de MongoDB-collectie
    await imagePathsCollection.updateOne(
      { username: gebruikersnaam },
      { $pull: { images: { filename: imagePath } } }
    )

    res.status(200).send('Afbeelding succesvol verwijderd')
  } catch (error) {
    console.error('Error deleting image:', error)
    res.status(500).send('Er is een fout opgetreden bij het verwijderen van de afbeelding')
  }
})

// ROUTE FUNCTIES

function showRegisterPage (req, res) {
  res.render('signUp.ejs')
}

function showLandingPage (req, res) {
  if (req.session.user) {
    res.render('landingPage.ejs', {
      username: req.session.user.username,
      profile_picture: req.session.user.profile_picture,
      session: req.session
    })
  } else {
    res.render('landingPage.ejs', {
      session: req.session
    })
  }
}

function showSignInPage (req, res) {
  res.render('signIn.ejs')
}

function createRequest (req, res) {
  if (req.session.user) {
    res.render('createrequest.ejs', {
      username: req.session.user.username,
      profile_picture: req.session.user.profile_picture,
      session: req.session
    })
  } else {
    res.redirect('/sign-in')
  }
}

function showDiscoverPage (req, res) {
  if (req.session.user) {
    res.render('discover.ejs', {
      username: req.session.user.username,
      profile_picture: req.session.user.profile_picture,
      session: req.session
    })
  } else {
    res.render('discover.ejs', {
      session: req.session
    })
  }
}

function showDetailPage (req, res) {
  if (req.session.user) {
    res.render('detail.ejs', {
      username: req.session.user.username,
      profile_picture: req.session.user.profile_picture,
      session: req.session
    })
  } else {
    res.render('detail.ejs', {
      session: req.session
    })
  }
}

// async function showPortfolioPage (req, res) {
//   if (req.session.user) {
//     try {
//       const requestList = await collection2.find({ creator: req.session.user.username }).toArray()
//       res.render('portfolio.ejs', {
//         username: req.session.user.username,
//         profile_picture: req.session.user.profile_picture,
//         requests: requestList,
//         session: req.session
//       })
//     } catch (error) {
//       console.error('Error fetching request list:', error)
//       res.status(500).send('Internal server error')
//     }
//   } else {
//     res.render('portfolio.ejs', {
//       session: req.session
//     })
//   }
// }

// NIEUWE GEBRUIKER TOEVOEGEN AAN DE DATABASE
const collectionPortfolioUploads = db.collection(process.env.DB_COLLECTION3)

// CHECKEN OF DE INLOG GEGEVENS KLOPPEN

async function signIn (req, res) {
  try {
    const userInput = await collection.findOne({ email: req.body.email })

    if (userInput && userInput.password === req.body.password) {
      req.session.user = {
        name: userInput.name,
        username: userInput.username,
        profile_picture: userInput.profile_picture
      }
      res.render('discover.ejs', {
        username: req.session.user.username,
        profile_picture: userInput.profile_picture,
        session: req.session
      })
    } else {
      res.status(401).send({ error: 'Invalid username or password' })
    }
  } catch (error) {
    console.error(error)
    res.send('Error during login')
  }
}

// NIEUWE GEBRUIKER TOEVOEGEN AAN DE DATABASE

async function addUser (req, res) {
  const existingEmail = await collection.findOne({ email: req.body.email })
  if (existingEmail) {
    return res.status(400).json({ error: 'E-mail already in use' })
  }

  const result = await collection.insertOne({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profile_picture: req.file.filename
  })

  req.session.user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    profile_picture: req.file.filename
  }

  console.log(`Added with _id: ${result.insertedID}`)

  res.render('discover.ejs', {
    username: req.body.username,
    profile_picture: req.file.filename,
    session: req.session
  })
}

// Assuming you have the MongoDB client properly configured and connected
app.post('/upload', upload.array('photos', 7), (req, res) => {
  const imagePaths = req.files.map(file => file.filename)

  // Update the existing document in MongoDB collection to push new image paths to the array
  collectionPortfolioUploads.updateOne(
    { portfolio: loginName }, // Filter to find the document for the logged-in user
    { $push: { images: { $each: imagePaths } } } // Update operation to push new image paths to the array
  )
    .then(() => {
      res.status(200).send('Files uploaded successfully')
    })
    .catch(error => {
      console.error('Error uploading files:', error)
      res.status(500).send('Error uploading files')
    })
})

// Assuming you want to retrieve the images from the database and display them on a webpage
app.get('/portfolio', (req, res) => {
  // Retrieve the images from the database for the logged-in user (in this case, 'Ivo')
  collectionPortfolioUploads.findOne({ portfolio: loginName })
    .then(data => {
      if (data) {
        // Assuming you have an HTML template to display the images
        res.render('portfolio', { images: data.images })
      } else {
        res.status(404).send('Portfolio not found')
      }
    })
    .catch(error => {
      console.error('Error retrieving portfolio:', error)
      res.status(500).send('Error retrieving portfolio')
    })
})

// REQUEST TOEVOEGEN AAN DE DATABASE

async function addRequest (req, res) {
  const images = req.files.map(file => file.filename)
  console.log(req.session.user.username)

  result = await collection2.insertOne({
    category: req.body.category,
    project_title: req.body.projectTitle,
    description: req.body.description,
    budget: req.body.budget,
    duration: req.body.duration,
    deadline: req.body.deadline,
    images: images,
    creator: req.session.user.username
  })

  //   await collection.updateOne(
  //     { _id: userProfile._id },
  //     { $push: { projects: result.insertedId } }
  // );

  const requestList = await collection2.find({}).toArray()
  res.render('requests.ejs', {
    requests: requestList,
    username: req.session.user.username,
    profile_picture: req.session.user.profile_picture,
    creator: req.session.user,
    session: req.session
  })
}

// REQUEST TONEN OP DE FIND REQUEST PAGE

async function showRequests (req, res) {
  const requestList = await collection2.find({}).toArray()

  if (req.session.user) {
    res.render('requests.ejs', {
      requests: requestList,
      username: req.session.user.username,
      profile_picture: req.session.user.profile_picture,
      session: req.session
    })
  } else {
    res.render('requests.ejs', {
      session: req.session,
      requests: requestList
    })
  }
}
