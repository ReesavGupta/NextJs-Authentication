export default function UserProfile({ params }: any) {
    return (
        <>
            <h1 className="text-4xl text-center my-10 text-slate-500 underline font-bold">
                Your data
            </h1>
            <div
                className="flex flex-col items-center justify-center w-1/2
            m-auto my-10 h-96 bg-slate-300 rounded-xl shadow-xl"
            >
                <hr />
                <p className="text-xl">This is your user-Id(fetched) :-</p>
                <span className="p-2 rounded bg-slate-400 text-gray-300 m-2 ">
                    {params.id}
                </span>
            </div>
        </>
    )
}
