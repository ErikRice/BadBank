const MongoClient = require('mongodb').client;
const url         = 'mongodb://localhost:27017';
let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    if (err) {
        console.log(err);
    }
    db = client.db('mybadbank');
});

function find(name, email, password) {
    return new Promise ((resolve, reject) => {
        db.collection('users')
            .find({name: name, email: email, password: password}) //balance???
            .toArray((err, user) => {
                err ? reject(err) : resolve(user)
            });
    });
};

function create(name, email, password) {
    return new Promise ((resolve, reject) => {
        const allUsers = db.collection('users')
        const doc = {name: name, email: email, password: password, balance: 0};
        allUsers.insertOne(doc, {w: 1}, function(err, doc) {
            err ? reject(err) : resolve(doc)
        });
    });
};

function update(name, email, password, transaction) {
    return new Promise ((resolve, reject) => {
        db.collection('users')
            .findOneAndUpdate(
                { name: name, email: email, password: password},                                            //??Questionable??
                { $inc: {balance: transaction} },
                { returnOrginal: false },
                function (err, docs) {
                    err ? reject(err) : resolve(docs);
                }
            );
    });
};

function allUsers() {
    return new Promise ((resolve, reject) => {
        db.collections('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
};


module.exports(find, create, update, allUsers);
