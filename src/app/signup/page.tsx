'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function SignupPage() {
    const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })
    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.username.length > 0 &&
            user.password.length > 0
        ) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log(response.data)
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div>
            <Toaster />
            <div className="h-96 bg-slate-200 text-slate-500 mt-10 p-4 w-1/2 border shadow-2xl m-auto flex items-center justify-center flex-col rounded-3xl">
                <h1 className="text-center text-3xl mb-4">
                    {loading ? 'Processing' : 'Sign-Up'}
                </h1>
                <div className="mb-4">
                    <label htmlFor="username">username:</label>
                    <input
                        className="rounded-md border ml-5 outline-none p-2"
                        id="username"
                        type="text"
                        placeholder="username"
                        value={user.username}
                        onChange={(e) => {
                            setUser({ ...user, username: e.target.value })
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email">email:</label>
                    <input
                        className="rounded-md border ml-12 outline-none p-2"
                        id="email"
                        type="text"
                        placeholder="email"
                        value={user.email}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value })
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input
                        className="rounded-md  border ml-5 outline-none p-2"
                        id="password"
                        type="text"
                        placeholder="password"
                        value={user.password}
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value })
                        }}
                    />
                </div>
                <button
                    onClick={onSignup}
                    className="shadow m-4 p-2 rounded bg-slate-50 border-gray-300"
                >
                    {buttonDisabled ? 'No Signin' : 'SignIn'}
                </button>
                <Link
                    href="/login"
                    className="text-sm text-slate-400 hover:underline"
                >
                    Visit login page ?
                </Link>
            </div>
        </div>
    )
}
