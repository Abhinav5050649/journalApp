const mongoose = requirw(`mongoose`);
const {Schema} = mongoose;

const entrySchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now,
    }
});

const Entry = mongoose.model('entry', entrySchema);
module.exports = Entry;