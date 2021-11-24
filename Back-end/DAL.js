import { MongoClient } from 'mongodb'
import mongo from 'mongodb'
import mongoose from 'mongoose'
const url = `mongodb+srv://${process.env.REACT_APP_DB_NAME}:${process.env.REACT_APP_DB_PASS}@cluster0.q0o69.mongodb.net/mybadbank?retryWrites=true&w=majority`;
// let db;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) return console.log(err);
    console.log(`Connected to DB!`)
});
// MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
//     if (err) {
//         console.log(`${err}: Couldn't connect to the database`);
//     }
//     console.log("Connected to database!")
//     // db = client.db('mybadbank');
// });

export const findUser = (name, email) => {
    return db.collection('users')
        .find({name: { $eq: name }, email: { $eq: email }}) //balance???
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
                {"_id": new mongo.ObjectId(id) },                       
                { $inc: {"balance": transaction} },
                { returnDocument: "after" }
            );
};

export const allUsers = () => {
    return db.collection('users')
        .find()
        .toArray();
};
