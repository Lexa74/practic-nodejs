import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter username']
    },
    age: {
        type: Number,
        required: [true, 'Enter age']
    },
    isAdmin: {
        type: Boolean,
        required: [true, 'Enter role']
    },
    experience: {
        type: Number,
        required: [true, 'Enter experience']
    }
})

export const User = mongoose.model('User', UserScheme)