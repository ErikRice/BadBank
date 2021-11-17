import { MongoClient } from 'mongodb'
const url           = 'mongodb://localhost:27017/';
let db;


MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.log(`${err}: Couldn't connect to the database`);
    }
    console.log("Connected to database!")
    db = client.db('mybadbank');
});

export const  findUser = (name, email, password) => {
    return db.collection('users')
        .find({name: { $eq: name }, email: { $eq: email }, password: {$eq: password }}) //balance???
        .toArray();
};

export const create = (name, email, password) => {
    const user = {name: name, email: email, password: password, balance: 0};
    return db.collection('users')
        .insertOne(user, {w: 1})
};

export const update = (name, email, password, transaction) => {
    return db.collection('users')
        .findOneAndUpdate(
            {name: {$eq: name}, email: {$eq: email}, password: {$eq: password}},                                          //??Questionable??
            { $inc: {balance: transaction} },
            { returnOrginal: false }
        );
};

export const allUsers = () => {
    return db.collection('users')
        .find()
        .toArray();
};


// export default { findUser, create, update, allUsers};
