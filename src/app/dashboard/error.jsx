'use client'

const Error = ({ error, reset }) => {
    return (
        <div className="text-red-400 py-10 text-center text-sm">Something went wrong... {error.message}</div>
    )
}

export default Error