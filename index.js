const express = require('express');
const config = require('./config.js');
const app = express();
const registRouter = require('./routes/regist.js');
const loginRouter = require('./routes/login.js');
const auth = require('./routes/auth.js')
const cors = require('cors');
var fs = require('fs');
require('dotenv').config()

app.use(express.json());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Request-Headers', '*');
//     next();
// });

app.use('*', cors());


app.use('/regist', registRouter);
app.use('/login', loginRouter);

app.use('/api', auth);
const routes = fs.readdirSync('./routes/tasks');
routes.forEach(route => {app.use('/api', require('./routes/tasks/'+route))});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is listening port ${PORT}`) 
})