import { connect } from '@/db/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
connect()
    .then(() => {
        console.log('Connection established')
    })
    .catch((err:any) => {
        console.log('connection couldnt get established', err.message)
    })

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findById(userId).select('-password')
        return NextResponse.json({
            message: 'User Found Successfully',
            user,
        })
    } catch (error: any) {
        console.log(
            'An error occured while fetching the data of the User:',
            error.message
        )
    }
}
