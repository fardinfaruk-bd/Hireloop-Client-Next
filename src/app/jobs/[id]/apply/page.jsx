import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { ShieldExclamation, Rocket, SquareCheck } from '@gravity-ui/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import React from 'react';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/applications';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-[80vh] flex flex-col justify-center items-center p-6 bg-zinc-50 dark:bg-zinc-950">
                <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldExclamation className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Access Restricted</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                        Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
                    </p>
                    <Link
                        href="/auth/signin"
                        className="inline-block w-full px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white dark:text-zinc-200 rounded-lg text-sm font-medium transition text-center shadow-sm"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(user.id);

    const plan = {
        name: "Free Plan",
        maxApplicationsPerMonth: 3,
    };
    
    const job = await getJobById(id);
    const hasRemainingApplications = applications.length < plan.maxApplicationsPerMonth;
    
    // Calculate progress percentage for the custom UI meter
    const usagePercentage = Math.min((applications.length / plan.maxApplicationsPerMonth) * 100, 100);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
                
                {/* Application usage allowance card */}
                <div className="w-full p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                    {plan.name}
                                </span>
                            </div>
                            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                <SquareCheck className="w-4 h-4 text-zinc-400" />
                                Monthly Usage: <span className="text-blue-600 dark:text-blue-400 font-bold">{applications.length}</span> / {plan.maxApplicationsPerMonth} applied
                            </h2>
                        </div>

                        <div>
                            <Link 
                                href="/plans" 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition"
                            >
                                <Rocket className="w-3.5 h-3.5" />
                                Upgrade Limit
                            </Link>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 rounded-full ${
                                applications.length >= plan.maxApplicationsPerMonth 
                                    ? 'bg-amber-500' 
                                    : 'bg-blue-600'
                            }`}
                            style={{ width: `${usagePercentage}%` }}
                        />
                    </div>
                </div>

                {/* Conditional block for either the Form or the Blocked state layout */}
                {hasRemainingApplications ? (
                    <JobApply applicant={user} job={job} />
                ) : (
                    <div className="w-full p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center">
                            <ShieldExclamation className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            Monthly Limit Reached
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                            You have used all {plan.maxApplicationsPerMonth} of your free applications for this period. Upgrade your tier to submit unlimited job forms.
                        </p>
                        <Link
                            href="/plans"
                            className="mt-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg shadow-sm transition"
                        >
                            View Premium Plans
                        </Link>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default ApplyPage;