import {Document, Schema} from 'mongoose';
import mongoose = require("mongoose");
import * as bcrypt from 'bcrypt';

export interface UserInterface extends Document {
    email: string;
    password: string;
    username: string;
};

export const userSchema = new Schema({
    email: {type: String, required: true},
    password: String,
    username: {type: String, required: true}
});

function beforeSave(next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        bcrypt.hash(this.password, saltRounds).then(pass => {
            this.password = pass;
            next()
        });
    }
}

userSchema.methods.authorize = function (password) {
    bcrypt.compare(password, this.password).then(data => {
        console.log(data);
    });
}

// don't use arrow functions it crashes
userSchema.pre('save', beforeSave);

export const User = mongoose.model<UserInterface>("User", userSchema);
