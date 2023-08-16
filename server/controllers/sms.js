require('dotenv').config()
const accountSid = 'AC9c61f687e5955707f994aca97661890c';
 const authToken = '8816006d1f5d19790b474d4e77b6ec50';
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services('VAe2e6c7e30651746c1386a14e4bd5c93f')
                .verifications
                .create({to: '+233503173414', channel: 'sms'})
                .then(verification => console.log(verification.sid));