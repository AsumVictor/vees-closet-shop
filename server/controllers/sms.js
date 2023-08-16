
const client = require('twilio')(process.env.accountSid, process.env.authToken);

client.verify.v2.services('VAe2e6c7e30651746c1386a14e4bd5c93f')
                .verifications
                .create({to: '+233598462787', channel: 'sms'})
                .then(verification => console.log(verification.sid));