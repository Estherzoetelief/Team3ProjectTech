const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const path = require('path');

require('dotenv').config();

const app = express();
const port = 8511;

// Middleware voor bestand uploaden met Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      // Bouw het bestandspad op basis van de originele bestandsnaam en een unieke identifier
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });
const upload = multer({ storage: storage });

// MongoDB URI
const uri = `mongodb+srv://mikedevries:${process.env.DB_PASSWORD}@projecttechapp.2oo3dq6.mongodb.net/?retryWrites=true&w=majority`;
// MongoDB client aanmaken
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connectie maken en server starten
async function startServer() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log('Database connection established');

    // Start de Express server nadat de MongoDB-verbinding is vastgesteld
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error(`Database connection error: ${err}`);
  }
}
startServer();

// MongoDB-collectie voor afbeeldingspaden
const imagePathsCollection = client.db('ProjectTechApp').collection('portfolio_uploads');

// ROUTES
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'view');

// Route voor het renderen van de portfolio-pagina
app.get('/portfolio', async (req, res) => {
    try {
      const gebruikersnaam = 'TestUser_newacc';
      const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam });
      let imagePaths = [];
      if (existingDataItem) {
        // Haal alleen de bestandsnamen op en voeg ze toe aan imagePaths
        imagePaths = existingDataItem.images.map(({ filename }) => filename);
      }
      res.render('portfolio', { imagePaths: imagePaths });
    } catch (error) {
      console.error('Error fetching user images from database:', error);
      res.status(500).send('Error fetching user images from database');
    }
  });
  

// Route voor het verwerken van het uploaden van afbeeldingen
app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
  try {
    const gebruikersnaam = 'TestUser_newacc';
    const fileContext = req.files.map(file => ({
      filename: file.filename
    //   filename: file.originalname
    //   , filepath: file.path
    }));
    const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam });
    if (existingDataItem) {
      const updatedImages = [...existingDataItem.images, ...fileContext];
      await imagePathsCollection.updateOne(
        { username: gebruikersnaam },
        { $set: { images: updatedImages } }
      );
    //   console.log('Images added to existing data item:', updatedImages);
      console.log('Images added to existing data item. File context:', updatedImages);
    } else {
      await imagePathsCollection.insertOne({ username: gebruikersnaam, images: fileContext });
      console.log('New data item created with images. File context:', fileContext);
    }
    res.redirect('/portfolio');
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).send('Error uploading files');
  }
});


// Route voor het verwijderen van een afbeelding
app.delete('/delete-image/:imagePath', async (req, res) => {
    try {
        const gebruikersnaam = 'TestUser_newacc';
        const imagePath = req.params.imagePath;
        // Verwijder de afbeelding van de webserver
        // Code om afbeelding te verwijderen van de webserver, bijvoorbeeld met fs.unlinkSync()

        // Verwijder de afbeelding uit de MongoDB-collectie
        await imagePathsCollection.updateOne(
            { username: gebruikersnaam },
            { $pull: { images: { filename: imagePath } } }
        );

        res.status(200).send('Afbeelding succesvol verwijderd');
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).send('Er is een fout opgetreden bij het verwijderen van de afbeelding');
    }
});
