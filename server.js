const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');
const register = require('./register');
const signin = require('./signin');
const profile = require('./profile');
const image = require('./image');

const db = knex({
	client:'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	}
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('It is working!');
})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)});
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)});



app.listen(process.env.PORT || 3001, () => {
	 console.log(`app is running on port ${process.env.PORT}`);
})