 
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const { home } = require('nodemon/lib/utils');


const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://dortex:kaydot245@nodelessons.utr3x.mongodb.net/nodelessons?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.set('views', 'views2');


app.use(express.static('public'));
// app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('tiny'));
app.use(morgan('short'));



app.get('/', (req, res) => {
    const blogs = [
        {title: "Introduction", snippet: "Welcome to my website, i am writing this code using a tutorial " },
        {title: "Beginner", snippet: "I started learning node and express few weeks back " },
        {title: "Assistance/Help", snippet: "Kindly assist/help in any little way you can. Thank you. "},
    ];
    res.render('index', { title: "Home", blogs});
})

app.get('/about', (req, res) => {
    res.render('about', { title : "About"});
})


app.get('/blogs/create', (req, res) => {
    res.render('create', { title : "Create a new blog"});
})

app.use((req, res) => {
    res.render('404', { title : "404 page"});
});






