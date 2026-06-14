import React from 'react';
import { Lock, LayoutGrid } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';

export default async function UnauthorizedPage() {
    const user = await getUserSession();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <div className="animate-bounce rounded-full bg-red-500/10 p-4 text-red-500 ring-8 ring-red-500/5">
        <Lock className="h-12 w-12" />
      </div>
      
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Access Denied
      </h1>
      
      <p className="mt-4 max-w-md text-base text-slate-400">
        Oops! You don't have permission to view this page. Please make sure you are logged into the correct account or contact administration.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/signin"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
        >
          Sign In
        </Link>
        
        <a
          href={`/dashboard/${user?.role}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-sm hover:bg-slate-800 transition-all"
        >
          <LayoutGrid className="h-4 w-4" />
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}