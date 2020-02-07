const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Create express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the mongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { newUserUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongoose database connection established successfully");
});

const smsRouter = require('./routes/sms');
const composeRouter = require('./routes/compose');

app.use('/sms', smsRouter);
app.use('/compose', composeRouter);

// Server initiation
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});