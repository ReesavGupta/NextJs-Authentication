'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log('there was an error : ', error)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, [])
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <>
            <h1 className="text-4xl text-center my-10">verify email</h1>
            <div className="flex flex-col items-center justify-center my-10 bg-slate-200 w-1/2 m-auto h-96 rounded-xl shawdow-xl">
                <h2 className="p-2 bg-slate-500 ">
                    {token ? `${token}` : 'no token'}
                </h2>
                {verified && (
                    <div>
                        <h2 className="text-2xl">Email Verified</h2>
                        <Link href={'/login'}>login</Link>
                    </div>
                )}
                {error && (
                    <div>
                        <h2 className="text-2xl text-red-500">Error</h2>
                    </div>
                )}
            </div>
        </>
    )
}
