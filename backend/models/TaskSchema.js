const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema({
    task: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const Task = mongoose.model('task',taskSchema);
module.exports = Task;