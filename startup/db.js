const mongoose = require('mongoose');

module.exports = function() {
  const db = 'mongodb://admin:qwertyuiop@altruist-shard-00-00-froma.azure.mongodb.net:27017,altruist-shard-00-01-froma.azure.mongodb.net:27017,altruist-shard-00-02-froma.azure.mongodb.net:27017/altruist?replicaSet=altruist-shard-0&ssl=true&authSource=admin';
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.log('Not connected'+ err));
};