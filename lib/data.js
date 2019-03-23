'use strict';
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/myproject?ssl=true';

const client = new MongoClient(url);







