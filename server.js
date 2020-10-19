// const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg', //postgresql
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true
      // user : 'postgres',
      // password : '',
      // database : 'smartbrain' //dev mode
    }
  });

const app = express();
app.use(express.json()); //have to otherwise cannot read user frontend input
app.use(cors());

app.get('/', (req,res)=> {
    res.send('Welcome to server.js. App is running on port 3001');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}) //dependency injector
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.put('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000,()=>{
    console.log(`App is running on port ${process.env.PORT}`);
});