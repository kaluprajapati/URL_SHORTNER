import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[260px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="my-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="my-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-slate-700">No URLs found</p>
        <p className="mt-1 text-sm">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  return (
    <div className="mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-100/80">
            <tr>
              <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Original URL
              </th>
              <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Short URL
              </th>
              <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Clicks
              </th>
              <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="transition hover:bg-slate-50">
                <td className="px-4 py-4">
                  <div className="max-w-xs truncate text-sm text-slate-700">{url.full_url}</div>
                </td>
                <td className="px-4 py-4">
                  <a
                    href={`http://localhost:3000/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-violet-600 underline decoration-violet-200 underline-offset-2 hover:text-violet-700"
                  >
                    {`localhost:3000/${url.short_url}`}
                  </a>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex min-w-[72px] justify-center rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700">
                    {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                      copiedId === url._id
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:brightness-110'
                    }`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserUrl