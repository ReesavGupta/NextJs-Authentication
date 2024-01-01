'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function ProfilePage() {
    const [data, setData] = useState('Nothing')
    const router = useRouter()
    const onLogout = async () => {
        try {
            axios.get('/api/users/logout')
            toast.success('Logout Successfull')
            router.push('/login')
        } catch (error: any) {
            console.log('there was an error while logging out', error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/users/me')
                console.log(res.data.user._id)
                setData(res.data.user._id)
                // return res
            } catch (error: any) {
                console.log(
                    'there was an error while fetching the data of the User',
                    error.message
                )
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <Toaster />
            <h1 className=" underline text-4xl text-center mt-10 text-slate-400">
                Profile Page
            </h1>
            <div className="flex flex-col items-center justify-center w-2/4 py-2 border m-auto my-10  bg-slate-300 text-slate-100 h-96 shadow-xl rounded-3xl">
                <hr />
                <p>If you have the token:- there's gonna be "Click Here!" </p>
                <hr />
                <h2 className="font-bold text-slate-500 underline hover:text-slate-800 transition">
                    {data === 'Nothing' ? (
                        `you don't have the token`
                    ) : (
                        <Link href={`/profile/${data}`}> Click Here!</Link>
                    )}
                </h2>
                <button
                    onClick={onLogout}
                    className="shadow m-4 p-2 rounded bg-slate-50 border-gray-300 text-slate-600"
                >
                    Logout
                </button>
                <hr />
            </div>
        </>
    )
}
