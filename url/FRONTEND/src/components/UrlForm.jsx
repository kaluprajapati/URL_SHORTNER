import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { queryClient } from '../main'

const UrlForm = () => {
  const [url, setUrl] = useState('https://example.com')
  const [customSlug, setCustomSlug] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!url.trim()) {
      setError('Please enter a valid URL.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const generatedShortUrl = await createShortUrl(url.trim(), customSlug.trim())
      setShortUrl(generatedShortUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    } catch (err) {
      setError(err.message || 'Unable to shorten this URL.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!shortUrl) return

    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {
      setCopied(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="url" className="mb-2 block text-sm font-medium text-slate-300">
          Enter your long URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full rounded-2xl border border-slate-700 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-slate-400 shadow-inner outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
        />
      </div>

      <div>
        <label htmlFor="customSlug" className="mb-2 block text-sm font-medium text-slate-300">
          Custom short name (optional)
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-white/5 px-3 py-2.5 shadow-inner">
          <span className="text-lg text-slate-400">/</span>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="my-brand-link"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-4 py-3.5 text-base font-bold text-white shadow-[0_12px_30px_rgba(139,92,246,0.45)] transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Creating short link...' : 'Shorten URL'}
      </button>

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
          <p className="mb-2 text-sm font-semibold text-emerald-200">Your shortened URL</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 rounded-xl border border-emerald-400/30 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-100 outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                copied ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default UrlForm