const { MongoClient } = require('mongodb');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;

const client = new MongoClient(mongoURI);
const db = client.db('forAnimal');

module.exports = db;
