import React, { useEffect, useMemo, useState } from 'react';

const RedirectPage = () => {
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('target');

    if (target) {
      setTargetUrl(target);
      const timer = window.setTimeout(() => {
        window.location.replace(target);
      }, 1000);

      return () => window.clearTimeout(timer);
    }
  }, []);

  const safeTarget = useMemo(() => {
    if (!targetUrl) return 'the destination';
    try {
      return new URL(targetUrl).hostname;
    } catch (_) {
      return 'the destination';
    }
  }, [targetUrl]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center text-white shadow-2xl shadow-slate-950/40">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-500" />
        <h1 className="text-2xl font-bold">Redirecting…</h1>
        <p className="mt-3 text-sm text-slate-300">
          You are being sent to {safeTarget}.
        </p>
      </div>
    </div>
  );
};

export default RedirectPage;
