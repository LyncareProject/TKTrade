// @ts-check

const express = require('express')
const cors = require("cors");
const path = require('path');

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.enable('trust proxy');
app.use(function(req, res, next){
        if(!req.secure){
                res.redirect("https://"+ req.headers.host + req.url);
        }else{
                next();
        }
});

const mainRouter = require('./routes/index')

app.use(express.static(path.join(__dirname, '/build')));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', mainRouter)

// @ts-ignore
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


module.exports = app
