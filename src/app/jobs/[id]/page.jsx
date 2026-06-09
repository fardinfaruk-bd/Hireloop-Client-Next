import { getJobById } from '@/lib/api/jobs';
import React from 'react';
import { Avatar, Button } from "@heroui/react";
import Link from 'next/link';

const page = async ({ params }) => {
    const { id } = await params;

    // Fetch data from your API/DB
    const jobDetails = await getJobById(id);

    // Destructure data safely
    const {
        title,
        category,
        CompanyName,
        CompanyLogo,
        type,
        salary,
        location,
        deadline,
        description,
    } = jobDetails || {};

    // Format deadline date cleanly (e.g., July 19, 2026)
    const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'N/A';

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column: Job Details */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header: Company Logo & Titles */}
                    <div className="flex items-center gap-4">
                        {jobDetails?.CompanyLogo && (
                            <Avatar
                                src={jobDetails?.CompanyLogo}
                                alt={`${CompanyName} Logo`}
                                radius="md"
                                className="w-12 h-12 bg-[#141414] border border-neutral-800 p-1"
                            />
                        )}
                        <div>
                            <h2 className="text-md font-medium text-neutral-400">{CompanyName}</h2>
                            <p className="text-sm text-neutral-500 capitalize">{category} Role</p>
                        </div>
                    </div>

                    {/* Main Job Title */}
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100">
                        {title}
                    </h1>

                    {/* Content Sections */}
                    <div className="space-y-8 pt-4">
                        {/* Responsibilities */}
                        <div>
                            <h3 className="text-xl font-semibold text-neutral-200 mb-3">
                                Core Responsibilities
                            </h3>
                            <p className="text-neutral-400 leading-relaxed whitespace-pre-line text-sm">
                                {description?.responsibilities}
                            </p>
                        </div>

                        {/* Requirements */}
                        {description?.requirements && (
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-200 mb-3">
                                    Requirements & Credentials
                                </h3>
                                <div className="bg-[#121212] border border-neutral-800 rounded-xl p-4">
                                    <p className="text-neutral-400 leading-relaxed whitespace-pre-line text-sm">
                                        {description?.requirements}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Benefits */}
                        {description?.benefits && (
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-200 mb-3">
                                    Benefits & Perks
                                </h3>
                                <p className="text-neutral-400 leading-relaxed whitespace-pre-line text-sm">
                                    {description?.benefits}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sticky Job Overview Sidebar */}
                <div className="lg:col-span-1 lg:sticky lg:top-8">
                    <div className="bg-[#121212] border border-neutral-800/60 rounded-2xl p-6 shadow-xl space-y-6">
                        <h3 className="text-lg font-semibold text-neutral-100">
                            Job Overview
                        </h3>

                        {/* Sidebar Information List */}
                        <div className="space-y-5">
                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <span className="text-purple-500 text-lg mt-0.5">📍</span>
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium">Location</p>
                                    <p className="text-sm font-semibold text-neutral-300">
                                        {location?.city}, {location?.country} ({location?.type})
                                    </p>
                                </div>
                            </div>

                            {/* Job Type */}
                            <div className="flex items-start gap-3">
                                <span className="text-purple-500 text-lg mt-0.5">💼</span>
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium">Job Type</p>
                                    <p className="text-sm font-semibold text-neutral-300 capitalize">{type}</p>
                                </div>
                            </div>

                            {/* Salary Range */}
                            <div className="flex items-start gap-3">
                                <span className="text-purple-500 text-lg mt-0.5">🪙</span>
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium">Salary Range</p>
                                    <p className="text-sm font-semibold text-neutral-300">
                                        {salary?.min >= 1000 ? `${salary.min / 1000}k` : salary?.min} – {salary?.max >= 1000 ? `${salary.max / 1000}k` : salary?.max} / year ({salary?.currency})
                                    </p>
                                </div>
                            </div>

                            {/* Application Deadline */}
                            <div className="flex items-start gap-3">
                                <span className="text-purple-500 text-lg mt-0.5">📅</span>
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium">Application Deadline</p>
                                    <p className="text-sm font-semibold text-neutral-300">{formattedDeadline}</p>
                                </div>
                            </div>
                        </div>

                        {/* Apply Action Button */}
                        <Link href={`/jobs/${id}/apply`}>
                            <Button className="w-full mt-4 py-3 px-4 bg-[#9333ea] hover:bg-[#a855f7] active:bg-[#7e22ce] text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-purple-900/20 tracking-wide">
                                Apply For This Job
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default page;