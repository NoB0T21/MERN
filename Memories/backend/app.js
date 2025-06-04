const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');

const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require('./DB/mongoose_db');
connectToDB();

const homeRouter = require('./routes/posts.routes')
const userRouter = require('./routes/user.routes')


app.use(cors(
  {origin: 'http://localhost:5173', 
  credentials: true,}
))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use('/', homeRouter);
app.use('/user', userRouter);
app.get('/', (req, res) => {
  res.send('Server is running...');
});

module.exports = app;