const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// ==== Paths ====
const viewsPath = path.join(__dirname,'../resources/views');
const staticPath = path.join(__dirname,'../public');

// console.log(viewsPath);

// ==== set templates engine ====
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(expressLayout);
app.use(express.static(staticPath));


app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/card',(req,res)=>{
    res.render('customers/card');
});
app.get('/login',(req,res)=>{
    res.render('auth/login');
});
app.get('/register',(req,res)=>{
    res.render('auth/register');
});

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});