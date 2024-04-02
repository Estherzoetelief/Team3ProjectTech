require('dotenv').config();

const express = require('express');
const multer = require('multer');
// const { MongoClient } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
const port = 8511;


app
  .use(express.urlencoded({extended: true})) 
  .use(express.static('uploads'))  
  .use(express.static('static'))            
  .set('view engine', 'ejs')      
  .set('views', 'view')   

app
    // .get('/register', showRegisterPage)
    // .get('/sign-in', showSignInPage)
    // .post('/create-account', addUser)
    // .get('/portfolio', showPortfolioPage)
    .listen(port)


// MongoDB URI
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const uri = `mongodb+srv://mikedevries:${process.env.DB_PASSWORD}@projecttechapp.2oo3dq6.mongodb.net/?retryWrites=true&w=majority&appName=ProjectTechApp`
// MongoDB client aanmaken
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





const gebruikersnaam = 'TestUser_newacc';

// Middleware voor bestand uploaden met Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

// MongoDB connectie maken en server starten
client.connect()
  .then(() => {
    console.log('Database connection established');
    // app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error(`Database connection error: ${err}`));

// MongoDB-collectie voor afbeeldingspaden
const imagePathsCollection = client.db(process.env.DB_NAME).collection('portfolio_uploads');

// ROUTES

// Route voor het renderen van de registratiepagina
app.get('/register', (req, res) => {
  res.render('signUp.ejs');
});

// Route voor het renderen van de inlogpagina
app.get('/sign-in', (req, res) => {
  res.render('signIn.ejs');
});

// Route voor het renderen van de portfolio-pagina voor normale code (database image loader gebruikt deze niet)
// app.get('/portfolio', (req, res) => {
//   res.render('portfolio.ejs');
// });

// Route voor het verwerken van het aanmaken van een account
app.post('/create-account', (req, res) => {
  res.render('account.ejs', { 
    naam: req.body.naam,
    wachtwoord: req.body.wachtwoord,
    geboortedatum: req.body.geboortedatum
  });
});

// Route voor het uploaden van afbeeldingen
// app.post('/upload', upload.array('profile-files'), async (req, res) => {
//   try {
//     const uploadedFiles = req.files.map(file => ({
//       path: file.path,
//       originalName: file.originalname
//     }));
    
//     // Afbeeldingspaden opslaan in MongoDB-collectie
//     const result = await imagePathsCollection.insertMany(uploadedFiles);
//     console.log(`${result.insertedCount} image paths inserted`);

//     res.sendStatus(200);
//   } catch (err) {
//     console.error('Error uploading files:', err);
//     res.status(500).send('Error uploading files');
//   }
// });

// hierboven moet eig uitgevoerd worden. maar dan met goede files. en naar goede collection. hieronder gebeurt niet zo validateHeaderValue.


// app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
//  console.log('naar database')
//   res.status(200).send('File uploaded successfully');
  
  
//   // req.files is array of `profile-files` files
//     // req.body will contain the text fields, if there were any
//     // var response = '<a href="/">Home</a><br>'
//     // response += "Files uploaded successfully.<br>"
//     // for(var i=0;i<req.files.length;i++){
//     //     response += `<img src="${req.files[i].path}" /><br>`
//     // }
    
//     // return res.send(response)


// })

// app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
//   try {
//       console.log('naar database');

//       // Haal de gebruikersnaam op uit de sessie of een andere bron, en sla deze op
//       const gebruikersnaam = 'VervangDitMetDeGebruikersnaam';

//       // Array om bestandspaden op te slaan
//       const filepaths = [];

//       // Loop door de geüploade bestanden en haal de bestandsnaam en het pad op
//       req.files.forEach(file => {
//           const filepath = file.path;
//           const filename = file.originalname;
//           filepaths.push({ filename, filepath });
//       });

//       // Opslaan van de gegevens in de MongoDB-collectie 'portfolio_uploads'
//       const result = await imagePathsCollection.insertMany(filepaths.map(filepath => ({
//           username: gebruikersnaam,
//           filename: filepath.filename,
//           filepath: filepath.filepath
//       })));
      
//       console.log(`${result.insertedCount} image paths inserted`);

//       // Stuur een succesvolle reactie terug naar de client
//       res.status(200).send('File uploaded successfully');
//   } catch (err) {
//       console.error('Error uploading files:', err);
//       res.status(500).send('Error uploading files');
//   }
// });




// werkende gedeelte zonder session

// app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
//   try {
//       console.log('naar database');

//       // Haal de gebruikersnaam op uit de sessie of een andere bron, en sla deze op
//       const gebruikersnaam = 'TestUser_newacc';

//       // Array om bestandspaden op te slaan
//       const filepaths = [];

//       // Loop door de geüploade bestanden en haal de bestandsnaam en het pad op
//       req.files.forEach(file => {
//           const filepath = file.path;
//           const filename = file.originalname;
//           filepaths.push({ filename, filepath });
//       });

//       // Zoek het data-item in de MongoDB-collectie op basis van de gebruikersnaam
//       const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam });

//       if (existingDataItem) {
//           // Voeg de nieuwe afbeeldingen toe aan de bestaande array met afbeeldingen
//           const updatedImages = [...existingDataItem.images, ...filepaths];

//           // Update het data-item met de nieuwe afbeeldingen
//           await imagePathsCollection.updateOne(
//               { username: gebruikersnaam },
//               { $set: { images: updatedImages } }
//           );

//           console.log('Images added to existing data item:', updatedImages);
//       } else {
//           // Als het data-item niet bestaat, maak dan een nieuw item aan met de afbeeldingen
//           await imagePathsCollection.insertOne({ username: gebruikersnaam, images: filepaths });
//           console.log('New data item created with images:', filepaths);
//       }

//       // Stuur een succesvolle reactie terug naar de client
//       res.status(200).send('File uploaded successfully');
//   } catch (err) {
//       console.error('Error uploading files:', err);
//       res.status(500).send('Error uploading files');
//   }
// });


// deel proberen met session
// const session = require('express-session');

// // Sessiemiddleware toevoegen
// app.use(session({
//   secret: process.env.SESSION_SECRET, // Geheime sleutel voor het ondertekenen van sessiecookies
//   resave: false,
//   saveUninitialized: true
// }));

// client.connect();

// // Middleware voor het verwerken van uploads
// app.post('/upload', upload.array('profile-files'), async (req, res) => {
//   try {
//     // Gebruikersidentificatie ophalen uit de sessie
//     const userId = req.session.userId; // Dit is slechts een voorbeeld, vervang dit met de daadwerkelijke gebruikersidentificatie

//     // Verdere verwerking van de upload, inclusief het koppelen van de gebruiker aan de geüploade bestanden
//     // ...
//   } catch (err) {
//     console.error('Error uploading files:', err);
//     res.status(500).send('Error uploading files');
//   }
// });



// TRY van gedeelte zonder session MET toevoegen geuploade en database images

// ---- 

// Route voor het renderen van de portfolio-pagina
app.get('/portfolio', async (req, res) => {
  try {
    // Haal de gebruikersnaam op uit de sessie of een andere bron, en sla deze op
    // const gebruikersnaam = 'TestUser_newacc';

    // Zoek het data-item in de MongoDB-collectie op basis van de gebruikersnaam
    const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam });

    // let imagePaths = [];
    // if (existingDataItem) {
    //   imagePaths = existingDataItem.images.map(image => image.filepath);
    // }

    let imagePaths = [];
    if (existingDataItem) {
     imagePaths = existingDataItem.images.map(({ filepath }) => filepath);
}


// Pas de renderfunctie aan om de imagePaths-variabele door te geven
  res.render('portfolio', { imagePaths: imagePaths });
  } catch (error) {
    console.error('Error fetching user images from database:', error);
    res.status(500).send('Error fetching user images from database');
  }
});


// -----


// Route voor het verwerken van het uploaden van afbeeldingen
app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
  try {
    // Voeg hier je bestaande logica toe voor het opslaan van de afbeeldingen in de database
       // Array om bestandspaden op te slaan
       const filepaths = [];

       // Loop door de geüploade bestanden en haal de bestandsnaam en het pad op
       req.files.forEach(file => {
           const filepath = file.path;
           const filename = file.originalname;
           filepaths.push({ filename, filepath });
       });
 
       // Zoek het data-item in de MongoDB-collectie op basis van de gebruikersnaam
       const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam });
 
       if (existingDataItem) {
           // Voeg de nieuwe afbeeldingen toe aan de bestaande array met afbeeldingen
           const updatedImages = [...existingDataItem.images, ...filepaths];
 
           // Update het data-item met de nieuwe afbeeldingen
           await imagePathsCollection.updateOne(
               { username: gebruikersnaam },
               { $set: { images: updatedImages } }
           );
 
           console.log('Images added to existing data item:', updatedImages);
       } else {
           // Als het data-item niet bestaat, maak dan een nieuw item aan met de afbeeldingen
           await imagePathsCollection.insertOne({ username: gebruikersnaam, images: filepaths });
           console.log('New data item created with images:', filepaths);
       }
    // Nadat de afbeeldingen zijn geüpload, render de portfolio-pagina opnieuw om de wijzigingen weer te geven
    res.redirect('/portfolio');
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).send('Error uploading files');
  }
});