//Model\User.js
import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    admin: { type: Boolean, default: false },
    permissions: { type: Boolean, default: false }, 
}, { timestamps: true });

export const User = models?.User  || model('User', UserSchema);