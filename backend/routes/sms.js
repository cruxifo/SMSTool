const formidable = require('formidable');
const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const csv = require('csv-parser');
const router = require('express').Router();

const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

let Consultant = require('../models/consultant.model');
let Sms = require('../models/sms.model');

router.route('/').post((req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "C:/Users/PRADEEP/Desktop/Test";
    form.keepExtensions = true;

    // Save and read the file
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        let fpath = files.file.path ;
        let smsid = fields['smsid'];
        Sms.findById(smsid).then(sms => {
            let smsMsg = sms['smsMsg'];
            let consultants = [];
            fs.createReadStream(fpath)
                .pipe(csv({ headers: false }))
                .on('data', (data) => consultants.push(data))
                .on('end', () => {
                    let phoneNosProper = true;
                    let phoneNos = [];
                    console.log(consultants);
                    consultants.forEach(consultant => {
                        let re = /^[+]*[1-9][0-9]{1,11}$/;
                        phoneNos.push(consultant['6']);
                        let found = consultant['6'].match(re) ;
                        if (found == null) {
                            phoneNosProper = false;
                        }    
                    });

            if ( phoneNosProper ) {
                let smsFailedPhones = [];
                phoneNos.forEach(phoneNo => {
                    client.messages
                        .create({
                            body: smsMsg,
                            from: '+441290211142',
                            to: phoneNo
                        })
                        .then(message => {
                            if (message.errorCode != null) {
                                smsFailedPhones.push(phoneNo);
                            }
                        });
                });
                if (smsFailedPhones.length > 0) {
                    res.json({
                        'failedPhoneNos' : smsFailedPhones.map(phoneno),
                        'smsSent': true
                        });
                    res.end();
                } else {
                    res.json({'smsSent': true});
                    res.end();
                }
            }
            else {
                res.status(400).json("Please format phone numbers and upload again");
                res.end();
            }

        });

        });
        
        
    });
});

module.exports = router;