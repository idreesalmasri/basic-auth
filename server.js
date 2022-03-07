'use strict';
const signupRoute = require('./auth/routes/signup.js');
const signinRoute = require('./auth/routes/signin.js');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(signupRoute);
app.use(signinRoute);
app.use(cors());
app.use(express.json());


function start(port) {
    app.listen(port,()=>{
        console.log(`running on port ${port}`)
    })
}
app.get('/',(req,res)=>{
    res.send('home route')
})
app.use(errorHandler);
app.use('*',notFound);

module.exports = {
    app: app,
    start: start
}