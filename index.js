const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./DAL');

app.use(express.static());  // what how to set up public in create react app
app.use(cors());

//create User
app.get('account/create/:name/:email/:password', function(req, res) {
    dal.find(req.params.name, req.params.email, req.params.password)
        .then((users) => {
            if(users.length > 0) {
                console.log('That user already exists');
                res.send('That user already exists');
            } else {
                dal.create(req.params.name, req.params.email, req.params.password)
                    .then((user) => {
                        console.log(user);
                        res.send(user);
                    })
            }
        })
});

//login User
app.get('account/login/:name/:email/:password', function(req, res) {
    dal.find(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            if(user.length > 0) {
                if(user[0].password === req.params.password) {
                    res.send(user);
                } else {
                    res.send('Login failed: Incorrect password');
                }
            } else res.send('Login failed: User does not exist');
        });
});

//update User Balance
app.get('account/update/:loggedInUser/:transaction', function(req, res) {
    const {name, email, password} = req.params.loggedInUser;
    const transaction = Number(req.params.transaction);
    console.log(`user:${name}-${email}-${password}-${transaction}`);
    dal.update(name, email, password, transaction)
        .then((err, docs) => {
            console.log(`${err ? err : docs}`);
            res.send(`${err ? err : docs}`);
        });
});

//get all Users               ***add admin authorization (logged in User with admin key)***
app.get('account/all', function (req, res) {
    dal.allUsers()
        .then((err, docs) => {
            console.log(`${err ? err : docs}`);
            res.send(`${err ? err : docs}`)
        });
});

