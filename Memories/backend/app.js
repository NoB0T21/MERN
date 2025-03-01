const express = require('express');
const app = express();
const cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require('./DB/mongoose_db');
connectToDB();

const homeRouter = require('./routes/posts.routes')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', homeRouter);

module.exports = app;