import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'

import router from './routes/account.js'


const app = express();
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded());
app.use(cors({  methods: ['POST', 'PUT'], origin: 'http://localhost:3000' }));

// app.use(express.static('public'));  // how to set up public in create react app

app.use('/account', router)



// app.get('/', function (req, res) {
//     res.send("Welcome!")
// })

// //create User
// app.post('/account/create/:user', async (req, res) => {
//     const {name, email, password} = req.params.user;
//     await dal.findUser(name, email, password)
//             .then(async (user) => {
//                 if(user.length > 0) {
//                 console.log('That user already exists');
//                 res.send('That user already exists');
//             } else {
//                 await dal.create(req.params.name, req.params.email, req.params.password)
//                         .then((user) => {
//                             console.log(user);
//                             res.send(`Thanks for creating an account with us, ${req.params.name}!`);
//                         })
//                         .catch((err)=> {
//                             console.log(err);
//                         })
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
// });

// //login User
// app.get('/account/login/:user', async (req, res) => {
//     const {name, email, password} = req.params.user;
//     await dal.findUser(name, email, password)
//             .then((user) => {
//                 if(user.length > 0) {
//                     if(user[0].password === req.params.password) {
//                         res.send(user);
//                     } else {
//                         throw 'Login failed: Incorrect password';
//                     }
//                 } throw 'Login failed: User does not exist';
//             })
//             .catch((err) => { 
//                 console.log(err)
//             })
// });

// //update User Balance
// app.put('/account/update/:loggedInUser/:transaction', async (req, res) => {
//     const {name, email, password} = req.params.loggedInUser;
//     const transaction = Number(req.params.transaction);
//     console.log(`user:${name}-${email}-${password}-${transaction}`);
//     await dal.update(name, email, password, transaction)
//             .then((err, docs) => {
//                 if (err) {
//                     throw "Couldn't change balance."
//                 }
//                 res.send(`${docs}`);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
// });

// //get all Users               ***add admin authorization (logged in User with admin key)***
// app.get('/account/all', async (req, res) => {
//     await dal.allUsers()
//         .then((docs) => {
//             res.send(docs);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// });

const Port = 3080;

app.listen(Port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Running on Port: ${Port}`)
})

