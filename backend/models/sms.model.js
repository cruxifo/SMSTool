const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const smsSchema = new Schema({
    smsMsg: { type: String, required: true },
    
}, {
    timestamps:true,
});

const Sms = mongoose.model('Sms', smsSchema);

module.exports = Sms;