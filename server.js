require('dotenv').config() 

const express = require('express')
const app = express()

// const port = 8511

app
  .use(express.urlencoded({extended: true})) 
  .use(express.static('static'))             
  .set('view engine', 'ejs')      
  .set('views', 'view')   

app
    .get('/register', showRegisterPage)
    .get('/sign-in', showSignInPage)
    .post('/create-account', addUser)
    .get('/portfolio', showPortfolioPage)
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

function showRegisterPage(req, res){
    res.render('signUp.ejs')
}

function showSignInPage(req, res){
    res.render('signIn.ejs')
}

function showPortfolioPage(req, res){
  res.render('portfolio.ejs')
}

function addUser(req, res){
	
	res.render('account.ejs', { 
        naam: req.body.naam,
        wachtwoord: req.body.wachtwoord,
        geboortedatum: req.body.geboortedatum
    });
	}


// NIEUWE GEBRUIKER TOEVOEGEN AAN DE DATABASE
const db = client.db(process.env.DB_NAME)
const collection = db.collection(process.env.DB_COLLECTION)
const collectionPortfolioUploads = db.collection(process.env.DB_COLLECTION3)

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

// Deze gaan we niet gebruiken want we willen afbeeldingen op schijf opslaan, webserver.
// // AFBEELDINGEN TOEVOEGEN AAN DE DATABASE
// const photosCollection = db.collection('photos');

// app.post('/api/portfolio/photos', (req, res) => {
//     const { userId, photoData } = req.body;

//     // Opslaan van de foto in de database
//     photosCollection.insertOne({ userId, photoData }, (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.status(201).send('Photo added to portfolio successfully');
//     });
// });



// Code voor opslaaan fotos in webserver.

// fs kan gebruikt worden in combinatie met Multer om de configuratie voor het 
// opslaan van afbeeldingen op de server aan te passen. Het kan handig zijn 
// als je verdere functionaliteit nodig hebt voor het werken met bestanden 
// op de server. Bijvoorbeeld, als we na het uploaden van een afbeelding 
// met Multer verdere verwerking nodig hebben, zoals het verplaatsen of 
// verwijderen van bestanden, dan kan fs daarbij van pas komen.

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: storage })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

// app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
//   // req.file is the `profile-file` file
//   // req.body will hold the text fields, if there were any
//   console.log(JSON.stringify(req.file))
//   var response = '<a href="/">Home</a><br>'
//   response += "Files uploaded successfully.<br>"
//   response += `<img src="${req.file.path}" /><br>`
//   return res.send(response)
// })

// app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
//     // req.files is array of `profile-files` files
//     // req.body will contain the text fields, if there were any
//     var response = '<a href="/">Home</a><br>'
//     response += "Files uploaded successfully.<br>"
//     for(var i=0;i<req.files.length;i++){
//         response += `<img src="${req.files[i].path}" /><br>`
//     }
    
//     return res.send(response)
// })
   

// app.listen(port,() => console.log(`Server running on port ${port}!`))


// const path = require('path');
// const fs = require('fs');

// app.use(express.static('public'));

// app.get('/images', (req, res) => {
//     const imageDir = path.join(__dirname, 'uploads');
//     fs.readdir(imageDir, (err, files) => {
//         if (err) {
//             console.error('Error reading directory:', err);
//             res.status(500).send('Error reading directory');
//             return;
//         }

//         const images = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
//         res.json(images);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });


// const multer = require ('multer')
// const upload = multer({dest: 'static/uploads/'})

// express ()
//   .post('/add-upload', upload.multiple('upload_Item'), add)

//   function add (req, res) {
//     console.log(req.file.filename)
//   }

const multer = require('multer');

// Defines storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null,Date.now() + file.originalname); // Renames the file to include the timestamp
  },
});

// In dit specifieke voorbeeld wordt de cb-functie aangeroepen met null als eerste argument 
// (wat aangeeft dat er geen fout is opgetreden) en de relatieve map "uploads/" als tweede argument, 
// wat aangeeft dat de geüploade bestanden moeten worden opgeslagen in de map met de naam "uploads".

// Hier moet nog een dynamisch login systeem komen
const loginName = 'Ivo'

// Initializes Multer with the storage configuration

const upload = multer({ storage: storage });

app.post('/upload', upload.single('uploaded_file'), (req, res) => {
  // req.file contains the uploaded file details
  // req.body contains other form data if any
      result = collectionPortfolioUploads.insertOne({
      portfolio: loginName,
      image1: req.file.filename
    })


  res.status(200).send('File uploaded successfully');
});