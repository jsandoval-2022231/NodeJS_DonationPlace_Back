import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    contion: {
        type: String,
        enum: ['NEW', 'USED', 'REFURBISHED', 'DAMAGED', 'FOR PARTS'],
        default: 'USED',
    },
    img: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

export default mongoose.model('Item', itemSchema);