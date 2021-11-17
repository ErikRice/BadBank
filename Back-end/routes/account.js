import express from 'express';

import { createUser, login, changeBalance } from "../Controllers/account.js"

const router = express.Router();

router.post('/create', createUser);

router.get('/login/:user', login);

router.put('/update/:user/:transaction', changeBalance);

export default router;