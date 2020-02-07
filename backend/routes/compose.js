const router = require('express').Router();
let Sms = require('../models/sms.model');


router.route('/').post((req, res) => {
    console.log("Call to compose a new message");
    
    const smsMsg = req.body.smsMsg;

    console.log(smsMsg);

    const newSms = new Sms({smsMsg});

    newSms.save()
        .then((sms) => {
            res.json(sms);
            res.end();
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;