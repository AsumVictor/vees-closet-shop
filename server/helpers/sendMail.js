const nodeMailer = require('nodemailer')

const sendMail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })


    await transporter.sendMail(options)
}

module.exports = sendMail