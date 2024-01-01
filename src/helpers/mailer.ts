const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
import User from '@/models/user.model'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }
        const transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'd02c6960814520',
                pass: '3eb0f8eaeebd4a',
            },
        })
        const emailOptions = {
            from: 'guptareesav16@gmail.com',
            to: email,
            subject:
                emailType === 'VERIFY'
                    ? 'verify your email'
                    : 'Reset your password',
            html: `<p>Click <a href = "${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">Here</a> to ${
                emailType === 'VERIFY'
                    ? 'verify your email'
                    : 'reset your password'
            }</p>`,
        }
        const mailResponse = await transport.sendMail(emailOptions)
        return mailResponse
    } catch (error: any) {
        console.log('Error while generating email: ', error)
        return error.message
    }
}
