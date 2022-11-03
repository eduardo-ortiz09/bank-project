const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
var db = null;



async function main() {
  // Use connect method to connect to the server
  db = client.db('myproject')
  await client.connect();
  console.log('Connected successfully to server');

  return 'Connected.';
}

function create( name, email, password ) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 0};
    collection.insertOne(doc, {w:1}, function(err) {
      err ? reject(err) : resolve(doc);
    });
  })
}

function all() {
  return new Promise((resolve, reject) => {
    const users = db
      .collection('users')
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      })
    return users;
  });
}

function searchUser( email ) {
  return new Promise((resolve, reject) => {
    const user = db
      .collection('users')
      .find({ email })
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      })
    return user;

  })
}

function updateBalance( email, balance) {
  return new Promise((resolve, reject) => {
    balance = Number(balance)
    const user = db
      .collection('users')
      .updateOne({ email },
        { $set: { balance } },
        function(err, docs) {
          err ? reject(err) : resolve(docs);
        }
      )
    return user;
  })
}

main()
  .then(console.log())
  .catch(console.error())


module.exports = {
  create,
  all,
  searchUser,
  updateBalance
}
