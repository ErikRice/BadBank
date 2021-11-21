import express from 'express';
// import cors from 'cors';
// import {corsOptions} from '../index.js';

import { createUser, login, changeBalance } from "../Controllers/account.js"

const router = express.Router();

router.post('/create', createUser);

router.post('/login', login);

router.put('/update', changeBalance);

export default router;