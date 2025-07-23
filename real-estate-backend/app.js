require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs/promises');
const { MongoClient, ObjectId } = require('mongodb');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: 'https://real-estate-app-frontend-enxj.onrender.com' }
});

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db, usersCollection, propertiesCollection;

// Connect to MongoDB
client.connect().then(async () => {
  db = client.db();
  usersCollection = db.collection('users');
  propertiesCollection = db.collection('properties');
  console.log('Connected to MongoDB Atlas');

  const adminUser = await usersCollection.findOne({ username: 'admin' });
  if (!adminUser) {
    await usersCollection.insertOne({ username: 'admin', password: 'admin' });
  }
}).catch(console.error);

// Multer setup for image uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Middlewares
app.use(cors({
  origin: 'https://real-estate-app-frontend-enxj.onrender.com',
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Serve React frontend static files
const frontendPath = path.join(__dirname, '../client/build');
app.use(express.static(frontendPath));

// API Routes
app.post('/users/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await usersCollection.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = { username, password };
    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await usersCollection.findOne({ username, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.delete('/users/:userId', async (req, res) => {
  try {
    const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.userId) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.get('/properties', async (req, res) => {
  try {
    const props = await propertiesCollection.find().toArray();
    res.json(props);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.get('/properties/:propertyId', async (req, res) => {
  const id = req.params.propertyId;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid property ID' });
  }

  try {
    const property = await propertiesCollection.findOne({ _id: new ObjectId(id) });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.get('/properties/:id/image/:index', async (req, res) => {
  const { id, index } = req.params;
  try {
    const property = await propertiesCollection.findOne({ _id: new ObjectId(id) });
    const image = property?.images?.[index];
    if (!image || !image.mimeType || !image.data) {
      return res.status(404).send('Image not found or corrupted');
    }

    res.contentType(image.mimeType);
    res.send(image.data.buffer);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/properties', upload.array('images'), async (req, res) => {
  const {
    title, description, rentOrSell, available, address,
    price, propertyType, surfaceArea, buildingYear
  } = req.body;

  try {
    const images = await Promise.all(req.files.map(async file => {
      const data = await fs.readFile(file.path);
      return {
        name: file.originalname,
        mimeType: file.mimetype,
        data
      };
    }));

    const newProperty = {
      title,
      description,
      rentOrSell,
      available: available === 'yes' || available === true || available === 'true',
      address,
      price: Number(price),
      propertyType,
      surfaceArea: Number(surfaceArea),
      buildingYear: Number(buildingYear),
      images
    };

    const insertResult = await propertiesCollection.insertOne(newProperty);
    const insertedProperty = await propertiesCollection.findOne({ _id: insertResult.insertedId });

    io.emit('propertyAdded', insertedProperty);
    res.status(201).json({ message: 'Property added', property: insertedProperty });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.patch('/properties/:propertyId', async (req, res) => {
  const id = req.params.propertyId;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid property ID' });
  }

  try {
    const updateResult = await propertiesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const updatedProperty = await propertiesCollection.findOne({ _id: new ObjectId(id) });
    io.emit('propertyUpdated', updatedProperty);

    res.json({ message: 'Property updated successfully', property: updatedProperty });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.put('/properties/:propertyId', async (req, res) => {
  try {
    const update = { $set: req.body };
    const result = await propertiesCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.propertyId) },
      update,
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ message: 'Property not found' });

    io.emit('propertyUpdated', result.value);
    res.json({ message: 'Property updated', property: result.value });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.delete('/properties/:propertyId', async (req, res) => {
  try {
    const result = await propertiesCollection.deleteOne({ _id: new ObjectId(req.params.propertyId) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Property not found' });

    io.emit('propertyDeleted', { propertyId: req.params.propertyId });
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.get('/properties/available/count', async (req, res) => {
  try {
    const count = await propertiesCollection.countDocuments({ available: true });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.get('/properties/unavailable/count', async (req, res) => {
  try {
    const count = await propertiesCollection.countDocuments({ available: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Fallback route: Serve index.html for all unknown frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../realestate-frontend/build', 'index.html'));
});

// Socket.IO events
io.on('connection', socket => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = { app, server, io };
