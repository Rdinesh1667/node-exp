
require('dotenv').config();
const express = require('express');
const app = express();
const options = require('./config/crossOptions');
const { logger } = require('./middleware/logEvents');
const path = require('path');
const cors = require('cors');
const { errorHandler } = require('./middleware/handleError');
const verifyJWT = require('./middleware/verifyJWT');
var cookies = require("cookie-parser");
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || '3500';

//Connect Mongo DB 
connectDB();

//Custom Middelware.
app.use(logger);


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resourse Sharing = CORS;
app.use(cors(options));

//   Express has the following built-in middleware functions:
// express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
app.use(express.json());

// express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+
app.use(express.urlencoded({ extended: false }));
app.use(cookies());

// express.static serves static assets such as HTML files, images, and so on.
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));





app.use('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Note found" });
    } else {
        res.type('txt').send("404 note found");
    }
});

app.use(errorHandler);


mongoose.connection.once('open',() => {
    console.log('Mongo DB Connected...')
    app.listen(PORT, () => {
        console.log("SERVER STARTED. AT PORT : ", PORT);
    });
})
