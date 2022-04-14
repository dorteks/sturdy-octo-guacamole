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
//the detail views is in details.ejs
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

//blog page (home page - all blogs)
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt : -1 })
        .then((result) => {
            res.render('index', { title : 'All Blogs', blogs : result });
        })
        .catch((err) => {
            console.log(err);
        })
});