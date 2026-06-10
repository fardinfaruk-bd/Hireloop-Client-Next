import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    //update the use table about the new plan
    return (
      <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-zinc-200 flex items-center justify-center p-4 sm:p-6 antialiased">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          
          {/* Animated Success Seal */}
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-50 text-emerald-500 mb-6 ring-8 ring-emerald-50/50">
            <svg
              className="h-6 w-6 transform scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
            Order Confirmed
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Thank you for your purchase!
          </p>

          {/* Receipt Panel */}
          <div className="mt-8 bg-slate-50/80 rounded-xl p-5 text-left border border-slate-100/80 space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400 uppercase tracking-wider font-semibold">
              <span>Receipt details</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">Paid</span>
            </div>
            
            <div className="pt-2 flex flex-col space-y-1">
              <span className="text-xs text-slate-400">Sent to</span>
              <span className="text-sm font-medium text-slate-700 truncate">{customerEmail}</span>
            </div>
            
            <div className="pt-1 text-[11px] text-slate-400 leading-normal">
              A copy of your receipt and order tracking details have been sent to your inbox.
            </div>
          </div>

          {/* Support Link */}
          <p className="mt-6 text-xs text-slate-400">
            Need assistance? Contact our team at{' '}
            <a 
              href="mailto:orders@example.com" 
              className="text-slate-600 hover:text-slate-900 font-medium underline underline-offset-4 transition-colors duration-200"
            >
              orders@example.com
            </a>
          </p>

          {/* Action Buttons */}
          <div className="mt-8 pt-2">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center px-5 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              Return to Dashboard
            </Link>
          </div>

          {/* Secure Stripe Badge */}
          <div className="mt-6 flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secured by Stripe</span>
          </div>
          
        </div>
      </div>
    )
  }
}