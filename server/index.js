const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

dotenv.config()

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdfnw234siodnweowejf43'

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)



app.get('/test', (req, res) => {
    res.send('Hello World');
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    } catch (error) {
        res.status(422).json(error)
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id })
        })
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.listen(4040)