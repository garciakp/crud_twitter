const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());

// Import Routes
const UserRoute = require('./routes/UserRoute');
const PostRoute = require('./routes/PostRoute');

//Routes
app.get('/', (req, res) => {
    res.send('Home: Crud Twitter');
});
app.use('/user', UserRoute);
app.use('/post', PostRoute);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true},
    () => console.log('Connected to DB')
);

//Listen to server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
