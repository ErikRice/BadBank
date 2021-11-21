import { MongoClient } from 'mongodb'
import mongo from 'mongodb'
const url = 'mongodb://localhost:27017/';
let db;


MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.log(`${err}: Couldn't connect to the database`);
    }
    console.log("Connected to database!")
    db = client.db('mybadbank');
});

export const findUser = (name, email, password) => {
    return db.collection('users')
        .find({name: { $eq: name }, email: { $eq: email }, password: {$eq: password }}) //balance???
        .toArray();
};

export const create = (name, email, password) => {
    const user = {name: name, email: email, password: password, balance: 0};
    return db.collection('users')
        .insertOne(user, {w: 1})
};

export const update = (id, transaction) => {
    return db.collection('users')
            .findOneAndUpdate(
                {"_id": new mongo.ObjectId(id) },                                          //??Questionable??
                { $inc: {"balance": transaction} },
                { returnDocument: "after" }
            );
};

export const allUsers = () => {
    return db.collection('users')
        .find()
        .toArray();
};


// export default { findUser, create, update, allUsers};
