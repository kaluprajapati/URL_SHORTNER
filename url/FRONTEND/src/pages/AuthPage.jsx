import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)
    const { isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: '/dashboard' })
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-4">
            <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
                <div className="grid md:grid-cols-2">
                    <div className="flex flex-col justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-white md:p-12">
                        <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">URL Shortener</p>
                        <h1 className="mt-4 text-4xl font-bold leading-tight">Turn long links into clean custom short URLs.</h1>
                        <p className="mt-4 max-w-sm text-sm text-indigo-100">
                            Manage your branded links, track clicks, and keep every URL memorable.
                        </p>
                    </div>

                    <div className="flex items-center justify-center bg-slate-50 p-6 md:p-10">
                        {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage