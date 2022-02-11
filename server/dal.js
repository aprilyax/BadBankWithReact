const MongoClient = require('mongodb').MongoClient; // require mongo
const url         = 'mongodb://localhost:27017'; // set url used to connect to local docker container
let db            = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Successfully connected to db server");

    // connect to myproject db
    db = client.db('myproject');  // assign the connection to the variable called db; accessible for all subsequent calls
});

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');                // note the collection is called users
        const doc = {name, email, password, balance: 0};          // create document
        collection.insertOne(doc, {w:1}, function(err, result) {  // insert this new document
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account
function find(email, password){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email, password: password})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// return all users that exist in collection of users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            })
    })
}


module.exports = {create, findOne, find, update, all};
