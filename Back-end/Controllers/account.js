import { findUser, create, update } from '../DAL.js';


export const createUser =  async (req, res) => {
    const {name, email, password} = req.body;
    console.log(`reqparams:${name},${email},${password}`);
    await findUser(name, email, password)
                .then(async (user) => {
                    if(user.length > 0) {
                    console.log('That user already exists');
                    res.send('That user already exists');

                } else {
                  await create(name, email, password)
                            .then((user) => {
                                console.log(user);
                                res.send(`Thanks for creating an account with us, ${name}!`);
                            })
                            .catch((err)=> {
                                console.log(err);
                                res.send(err)
                            })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
};

export const login = async (req, res) => {
    const {name, email, password} = req.body;
    await findUser(name, email, password)
                .then((user) => {
                    if(user.length > 0) {
                        if(user[0].password === req.params.password) {
                            res.send(user);
                        } else {
                            throw 'Login failed: Incorrect password';
                        }
                    } throw 'Login failed: User does not exist';
                })
                .catch((err) => { 
                    console.log(err)
                })
};

export const changeBalance = async (req, res) => {
    const {name, email, password} = req.params.loggedInUser;
    const transaction = Number(req.params.transaction);
    console.log(`user:${name}-${email}-${password}-${transaction}`);
    await update(name, email, password, transaction)
                .then((err, docs) => {
                    if (err) {
                        throw "Couldn't change balance."
                    }
                    res.send(`${docs}`);
                })
                .catch((err) => {
                    console.log(err);
                })
};