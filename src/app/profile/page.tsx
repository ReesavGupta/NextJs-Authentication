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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>profile</h1>
            <hr />
            <p>This is the profile page</p>
            <hr />
            <h2>
                {data === 'Nothing' ? (
                    'Nothing'
                ) : (
                    <Link href={`/profile/${data}`}> {data}</Link>
                )}
            </h2>
            <button
                onClick={onLogout}
                className="shadow m-4 p-2 rounded bg-slate-50 border-gray-300"
            >
                Logout
            </button>
            <hr />
        </div>
    )
}
