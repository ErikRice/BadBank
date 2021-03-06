import { MongoClient } from 'mongodb'
import mongo from 'mongodb'
import dotenv from 'dotenv'
dotenv.config({ path: '.env'})
let db;

MongoClient.connect(process.env.REACT_APP_MONGODB_URI || process.env.MONGOLAB_URI, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.log(`${err}: Couldn't connect to the database`);
    }
    console.log("Connected to database!")
    db = client.db('mybadbank');
    return db;
});
export const findByEmail = (email) => {
    return db.collection('users')
        .find({email: {$eq: email}})
        .toArray();
}

export const findUser = (name, email) => {
    return db.collection('users')
        .find({name: { $eq: name }, email: { $eq: email }})
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
