import React from "react";
import { ShieldAlert, LayoutGrid, ArrowLeft, LogIn } from "lucide-react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";

export default async function ForbiddenPage() {
  const user = await getUserSession();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.12),transparent_65%)]" />

      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-2xl backdrop-blur">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 ring-8 ring-red-500/5">
          <ShieldAlert className="h-10 w-10 text-red-500" />
        </div>

        {/* Status Code */}
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Error 403
        </p>

        {/* Title */}
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Forbidden Access
        </h1>

        {/* Description */}
        <p className="mt-4 text-base leading-7 text-slate-400">
          You don't have permission to access this page.
          {user
            ? " If you believe this is a mistake, please contact an administrator."
            : " Please sign in with an account that has the required permissions."}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {user ? (
            <Link
              href={`/dashboard/${user.role}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              <LayoutGrid className="h-4 w-4" />
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          )}

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}