import { findUser, create, update } from '../DAL.js';
import express from 'express';


export const createUser =  async (req, res) => {
    const {name, email, password} = req.body;
    console.log(`reqparams:${name},${email},${password}`);
    try {
        const user = await findUser(name, email, password);
        if (user.length > 0) return res.status(400).json({message: "User already exists"})       
        // const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await create(name, email, password); // : hashPassword
        // const token = jwt.sign({email: newUser.email, id: newUser._id}), "test", {expiresIn: "1h"});
        res.status(200).json({ result: newUser });//add token to this
    } catch (err) {
        res.status(500).json({message: "Something went wrong..."});
        console.log(err)
    }
        
        
        
        // .then(async (user) => {
        //         } else {
        //           await create(name, email, password)
        //                     .then((user) => {
        //                         console.log(user);
        //                         res.send(`Thanks for creating an account with us, ${name}!`);
        //                     })
        //                     .catch((err)=> {
        //                         console.log(err);
        //                         res.send(err)
        //                     })
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })
};

export const login = async (req,res) => {
    const {name, email, password} = req.body;
    try { 
        const user = await findUser(name, email, password);
        if (user === []) return res.status(404).json({message: "User does not exist"});
    //  const correctPassword = await bcrypt.compare(password, user.password);
        // if (!correctPassword) return res.status(400).json({message: "Incorrect password"})
      //const token = jwt.sign({ email: user.email, id: user._id}, secret ("test" stored in .env file), {expiresIn: "1h"})
        res.status(200).json({ user });//add token to this
    } catch (err) {
        res.status(500).json({message: "Something went wrong..."});
        console.log(err)
    }
        // if(res.length > 0) {
        //                 if(res[0].password === password) {
        //                     console.log("Line 36 user:", typeof(res));
        //                     const user = JSON.stringify(res[0]);
        //                     res.send(user);
        //                 } else {
        //                     throw 'Login failed: Incorrect password';
        //                 }
        //             } throw 'Login failed: User does not exist';
        // //         })
        //         .catch((err) => { 
        //             console.log(err)
        //         })
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
        // next();
        return
    } catch (err) {
        res.status(500).json({message: "Something went wrong..."});
        console.log(err);
    }
    // console.log(`user: ${userId}`);
    // await update(userId)
    //             .then((err, docs) => {
    //                 if (err) {
    //                     throw "Couldn't change balance."
    //                 }
    //                 res.send(`${docs}`);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
};

// export const findUpdate = (req,_) => {
//     let { id } = req.body;
//     console.log("findUpdatefired", id);
//     return db.collection('users')
//              .find({"_id": new mongo.ObjectId(id) })
//              .toArray()
// }