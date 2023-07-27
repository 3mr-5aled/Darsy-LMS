const nodemailer =require('nodemailer')
require('dotenv').config()

const sendemail=async(options)=>{
    console.log('innn')
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:true,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD,
    }
})
const msgOpt={
    from:'Darsy.com',
    to:options.email,
    subject:options.message,
    text:options.text
}
    await transporter.sendMail(msgOpt)
}
module.exports=sendemail