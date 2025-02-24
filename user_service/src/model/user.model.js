import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'], 
        default: 'USER',
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    ratings: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', userSchema);