import { connect } from '@/db/dbConfig'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
const bcrypt = require('bcryptjs')
import jwt from 'jsonwebtoken'
connect()
    .then(() => {
        console.log('connection succesful')
    })
    .catch((error) => {
        console.log(error)
    })

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        // check if user exist or not
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: 'User does not exists' },
                { status: 400 }
            )
        }
        // check if password exist
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json(
                { error: 'Invalid Password' },
                { status: 400 }
            )
        }
        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
        }
        const options = { httpOnly: true }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1d',
        })
        const response = NextResponse.json({
            message: 'Login Successful',
            success: true,
        })
        response.cookies.set('token', token, options)
        return response
    } catch (error: any) {
        console.log('there was an error while logging in:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
