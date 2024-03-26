require('dotenv').config();

const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 8511;


app
  .use(express.urlencoded({extended: true})) 
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
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// MongoDB client aanmaken
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware voor bestand uploaden met Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
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

// Route voor het renderen van de portfolio-pagina
app.get('/portfolio', (req, res) => {
  res.render('portfolio.ejs');
});

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


app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
  try {
      console.log('naar database');

      // Haal de gebruikersnaam op uit de sessie of een andere bron, en sla deze op
      const gebruikersnaam = 'TestUser';

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

      // Stuur een succesvolle reactie terug naar de client
      res.status(200).send('File uploaded successfully');
  } catch (err) {
      console.error('Error uploading files:', err);
      res.status(500).send('Error uploading files');
  }
});
