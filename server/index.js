const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const cheerio = require("cheerio")
const axios = require("axios")


//mongoose.connect('mongodb://localhost:27017/search-console-db')
mongoose.connect('mongodb+srv://akshayparkad:eglkRs2n5md3GcsI@cluster0.vponf1z.mongodb.net/?retryWrites=true&w=majority');

//pass - eglkRs2n5md3GcsI

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {

    try {

        const cryptedPassword = await bcrypt.hash(req.body.password, 10);

        await User.create({

            name: req.body.name,
            email: req.body.email,
            password: cryptedPassword
        })

        res.json({ status: 'ok' })

    } catch (err) {

        res.json({ status: 'error' })
    }

})


app.post('/api/login', async (req, res) => {
    console.log(req.body);


    const user = await User.findOne({ email: req.body.email});

    if(!user){
        return res.json({ status: 'error', error: 'Invalid Login' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {

        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
        }, 'secret123', { expiresIn: '24h' })

        return res.json({ status: 'ok', user: {token, name: user.name} });
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/verify', (req, res)=>{

    const token = req.headers.authorization;

    if(!token){
        res.json({ status: 'error' });
    }

    jwt.verify(token, 'secret123', (err, decoded) => {
        if (err) {
          return res.json({status: 'error', error: 'Invalid token' });
        }

        return res.json({ status: 'ok' });
  });
})




app.post('/api/scrapit', async(req, res)=>{

    const token = req.headers.authorization;
    const url = req.body.page;

    if(!token){
        res.json({ status: 'error' });
    }

    jwt.verify(token, 'secret123', async(err, decoded) => {

        if (err) {

          return res.json({status: 'error', error: 'Invalid token' });
          
        }else{
            try{
                const response = await axios.get(url);
                const scrappedData = response.data;
                return res.json({status: 'ok', scrappedData: scrappedData});

            } catch(error){
                return res.json({status: 'error', error: 'scappingError' });
            }

            }
        })
    })

    

app.listen(8000, () => {
    console.log('Server Started.....');
})