import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        const response = decodedToken.id
        return response
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}
