import { connect } from '@/db/dbConfig'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
const bcrypt = require('bcryptjs')

connect()
    .then(() => {
        console.log('connected to the server')
    })
    .catch((err) => {
        console.log('some error occured while db connection', err)
    })

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        console.log(reqBody, 'hi')

        //check if user already exists
        const user = await User.findOne({ email })
        console.log(user)

        if (user) {
            return NextResponse.json(
                { error: 'user already exists' },
                { status: 400 }
            )
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)

        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        }).save()

        console.log(newUser.username)

        console.log(newUser)

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            newUser,
        })
    } catch (error: any) {
        console.error('Error during user creation:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
