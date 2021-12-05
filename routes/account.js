import express from 'express';
import userAuth from '../Middleware/user.js'

import { createUser, login, changeBalance } from "../Controllers/account.js"

const router = express.Router();

router.post('/create', createUser);

router.post('/login', login);

router.put('/update', userAuth, changeBalance);


export default router;