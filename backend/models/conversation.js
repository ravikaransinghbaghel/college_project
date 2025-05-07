import mongoose from'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    massages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Massage'
    }]
}, { timeseries: true });

export default mongoose.model('Conversation', conversationSchema);
