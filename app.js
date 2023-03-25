const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const usersRoute = require('./routes/usersRoute');

dotenv.config();

const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '/build')));

app.use(usersRoute);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})