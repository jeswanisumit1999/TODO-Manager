const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: String,
    tasks: [String]
})


module.exports = mongoose.model('todo', todoSchema);