/**
 * @file database.js
 *
 * Define db connection and schema
 */

const mongoose = require('mongoose');

/**
 *  Build a connection to the mongo db.
 **/
function initMongoConnection() {
  if (typeof process.env.MONGO_URL === 'undefined') {
    console.error('MONGO_URL ENV var not set.');
    process.exit(0);
  }

  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', function(err) {
    console.error('Connection error:', err) }
  );

  db.once('open', function() {
    console.log('Connected to Mongo');
  });
};

// Step 1: Define the schema for the model
const fellowSchema = new mongoose.Schema({
  name: String,
  favoriteInstructor: String
});

// Step 2: Define the Model
const Fellow = mongoose.model('Fellow', fellowSchema);

// Adding schema for Instructor
const instructorSchema = new mongoose.Schema({
  name: String,
  favoriteColor
});

// Define instructor model
const Instructor = mongoose.model('Instructor', instructorSchema);

/**
 * Exporting an object of properties!
 *
 * You can import one of these using destructuring:
 * e.g. const { initMongoConnection } = require('./database');
 **/
module.exports = { Fellow, Instructor, initMongoConnection }