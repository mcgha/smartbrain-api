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
      host : '127.0.0.1',
      user : 'postgres',
      password : '',
      database : 'smartbrain'
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

app.listen(3001,()=>{
    console.log('App is running on port 3001')
});