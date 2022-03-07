'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const express = require('express');
const {users} = require('../models/index');
const router = express.Router();
    const authentication = async (req, res, next) => {
        if(req.headers['authorization']) {
            let basicHeaderParts= req.headers.authorization.split(' ');
            console.log('basicHeaderParts >>> ',basicHeaderParts);
            let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
            console.log('encodedPart >>> ',encodedPart);
            let decoded = base64.decode(encodedPart); //username:password
            console.log('decoded >>> ',decoded);
            let [username,password]= decoded.split(':'); //[username: password]
            // console.log('username');
            
                const user = await users.findOne({where:{username:username}});
                const valid = await bcrypt.compare(password,user.password);
                if(valid) {
                    
                    next();
                } else {
                    next(`input is invalid`);
                }
    }
}

module.exports = authentication;