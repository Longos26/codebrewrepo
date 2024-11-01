//User.js
import {model,models,Schema} from 'mongoose';

const UserSchema = new Schema({
    email: {type: String,required: true, unique:true},
    password: {
        type:String,
        required:true,
        validate: pass => {
            if (!pass?.length || pass.length < 5){
                new Error ('password must be at least 5 characters');
            }
            
        },
    },
}, {timestamps:true});
UserSchema.post('validate', function (user){
    user.password = 'hashed';
})

export const User = models?.User || model('User', 
    UserSchema);