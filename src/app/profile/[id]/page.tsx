export default function UserProfile({params}:any) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr />
            <p className="text-4xl">This is the profile page</p>
            <span className="p-2 rounded bg-slate-600 text-gray-300 m-2">{params.id}</span>
        </div>
    )
}