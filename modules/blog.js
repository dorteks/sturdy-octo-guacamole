const { truncate } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title: {
        toString,
        required: true
    },

    snippet: {
        toString,
        required: true
    },

    body: {
        toString,
        required: truncate,
    }
}, {timestamps: true});


const Blog = mongoose.model('Blog', blogSchema);
module.export = Blog;