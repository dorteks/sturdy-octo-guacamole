 
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


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true }));
app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('tiny'));
// app.use(morgan('short'));


//routes

//redirecting home page to /blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
})


//blog routes

//to create a new blog
app.get('/blogs/create', (req, res) => {
    res.render('create', { title : "Create a new blog"});
})



//to post a blog then redirect to home page
app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
});

//to move the blog to the page wth the id indicated
app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
    console.log(id);

    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog: result, title : 'Blog Details'})
    })
    .catch((err) => {
        console.log(err);
    });
});
//the detail views is in details.ejs


//to delete a blog, then redirect to home page
app.delete('/blogs/:id', (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs' })
    })
    .catch((err) => {
        console.log(err);
    });
})


// routes
//about page
app.get('/about', (req, res) => {
    res.render('about', { title : "About"});
})


//blog page (home page)
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt : -1 })
        .then((result) => {
            res.render('index', { title : 'All Blogs', blogs : result });
        })
        .catch((err) => {
            console.log(err);
        })
})

//404 page
app.use((req, res) => {
    res.render('404', { title : "404 page"});
});






