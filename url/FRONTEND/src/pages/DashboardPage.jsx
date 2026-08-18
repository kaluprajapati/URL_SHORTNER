import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_30%),linear-gradient(180deg,_#020817_0%,_#071a2d_42%,_#020817_100%)] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_80px_rgba(15,23,42,0.55)] backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-300">Dashboard</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Create your custom short links
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#0d1b2a]/90 p-6 shadow-[0_30px_60px_rgba(15,23,42,0.65)] backdrop-blur-sm">
            <UrlForm />
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#f5f7fb] p-4 shadow-[0_30px_60px_rgba(15,23,42,0.65)]">
            <UserUrl />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage