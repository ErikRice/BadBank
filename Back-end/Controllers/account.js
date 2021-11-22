import { findUser, create, update } from '../DAL.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const createUser =  async (req, res) => {
    const {name, email, password} = req.body;
    console.log(`reqparams:${name},${email},${password}`);
    try {
        const user = await findUser(name, email, password);
        if (user.length > 0) return res.status(400).json({message: "User already exists"})
        const salt = await bcrypt.genSalt()       
        const hashPassword = await bcrypt.hash(password, salt);
        await create(name, email, hashPassword); // : hashPassword
        // const token = jwt.sign({email: newUser.email, id: newUser._id}), "test", {expiresIn: "1h"});
        const userData = await findUser(name, email, password);
        res.status(200).json({ userData });//add token to this
    } catch (err) {
        res.status(500).json({message: "Something went wrong..."});
        console.log(err)
    }
};

export const login = async (req, res) => {
    const {name, email, password} = req.body;
    try { 
        const user = await findUser(name, email);
        if (user === []) return res.status(404).json({message: "User does not exist"});
        console.log("password", user)
        const correctPassword = await bcrypt.compare(password, user[0].password);
        if (!correctPassword) return res.status(400).json({message: "Incorrect password"})
      //const token = jwt.sign({ email: user.email, id: user._id}, secret ("test" stored in .env file), {expiresIn: "1h"})
        res.status(200).json({ user });//add token to this
    } catch (err) {
        res.status(500).json({message: "Something went wrong..."});
        console.log(err)
    }
};

export const changeBalance = async (req, res) => {
    let { id, transaction } = req.body;
    console.log("changeBalance",req.body);
    transaction = Number(transaction);
    try {
        console.log("_id:", id, "transaction:", transaction);
        const user = await update(id, transaction);
        if (!user.value) return res.status(404).json({message: "User does not exist"});
        res.status(200).json({ user });
        return
    } catch (err) {
        res.status(500).json({message: "Something went wrong..."});
        console.log(err);
    }
};

// export const findUpdate = (req,_) => {
//     let { id } = req.body;
//     console.log("findUpdatefired", id);
//     return db.collection('users')
//              .find({"_id": new mongo.ObjectId(id) })
//              .toArray()
// }