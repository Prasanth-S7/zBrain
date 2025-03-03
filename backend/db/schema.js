import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const contentTypes = ['article', 'video', 'document', 'tweet', 'other'];

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: contentTypes,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    shareable: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        enum: [
            'technology',
            'business',
            'finance',
            'health',
            'entertainment',
            'sports',
            'science',
            'education',
            'travel',
            'lifestyle',
            'other'
        ]
    }]
});

const User = mongoose.model('User', userSchema);
const Content = mongoose.model('Content', contentSchema);

export {
    User,
    Content
};