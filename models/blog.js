const { truncate } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    snippet: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: truncate,
    }
}, {timestamps: true});


const Blog = mongoose.model('Blog', blogSchema);
module.export = Blog;