'use strict'
const express = require('express');
const {users} = require('../models/index');
const router = express.Router();
const authentication = require('../middleware/authentication.js');



router.post('/signin',authentication,signinFunc);

async function signinFunc(req,res) {
    res.status(200).json({username:username});
}
module.exports = router;