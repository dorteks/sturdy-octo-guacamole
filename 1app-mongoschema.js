 
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const { home } = require('nodemon/lib/utils');
const Blog = require('./models/blog');


const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://dorteks:kaydot245@nodelessons.utr3x.mongodb.net/nodelessons?retryWrites=true&w=majority'
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



// mongoose and mongo sandbox routes
app.get('/add-blog', (req,res) =>  {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/all-blogs', (req,res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/single-blog', (req,res) => {
    Blog.findById("6248473de5e388113b9a21c2")
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})




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






