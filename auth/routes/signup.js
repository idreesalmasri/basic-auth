'use strict';
const express = require('express');
const {users} = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', signupFunc);

async function signupFunc(req, res) {
    let { username, password } = req.body;
    
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        
        const newUser = await users.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
}
module.exports = router;

