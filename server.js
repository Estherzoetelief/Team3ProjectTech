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
    cb(null, '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
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
      imagePaths = existingDataItem.images.map(({ filepath }) => filepath);
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
    const filepaths = req.files.map(file => ({
      filename: file.originalname,
      filepath: file.path
    }));
    const existingDataItem = await imagePathsCollection.findOne({ username: gebruikersnaam });
    if (existingDataItem) {
      const updatedImages = [...existingDataItem.images, ...filepaths];
      await imagePathsCollection.updateOne(
        { username: gebruikersnaam },
        { $set: { images: updatedImages } }
      );
      console.log('Images added to existing data item:', updatedImages);
    } else {
      await imagePathsCollection.insertOne({ username: gebruikersnaam, images: filepaths });
      console.log('New data item created with images:', filepaths);
    }
    res.redirect('/portfolio');
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).send('Error uploading files');
  }
});
