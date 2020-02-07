const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consultantSchema = new Schema({
    consultantname: { type: String, required: true },
    hospital: { type: String, required: true },
    mobileno: { type: String, required: true },
}, {
    timestamps:true,
});

const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;