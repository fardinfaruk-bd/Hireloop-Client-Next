"use client";
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Briefcase, Persons, Thunderbolt, CircleCheck, Globe, HardDrive, Cpu } from '@gravity-ui/icons';
import { DashboardStats } from '@/components/Daschboard/DashboardStats';
import TopCompanies from '@/components/Daschboard/TopCompanies';
import RecentApplications from '@/components/Daschboard/RecentApplications';
import { Spinner } from '@heroui/react';

const RecruiterDashboardHomePage = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen gap-4">
                <Spinner />
            </div>
        )
    }

    const user = session?.user;
    

    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];
    // Mock data for candidate submissions
    const mockApplications = [
        { id: 1, name: "Juliananne Moore", role: "Senior Product Designer", dateApplied: "Oct 24, 2023", experience: "6 years", status: "Interviewing" },
        { id: 2, name: "Robert Downey", role: "Backend Engineer", dateApplied: "Oct 23, 2023", experience: "4 years", status: "New" },
        { id: 3, name: "Emma Stone", role: "Marketing Lead", dateApplied: "Oct 22, 2023", experience: "8 years", status: "Reviewing" },
        { id: 4, name: "Chris Pratt", role: "Product Manager", dateApplied: "Oct 21, 2023", experience: "5 years", status: "Rejected" },
    ];

    // Mock data for company monitoring panel
    const mockCompanies = [
        { id: 1, name: "Google Inc.", industry: "Technology", location: "Mountain View", activeJobs: 24, icon: Globe },
        { id: 2, name: "Meta Platforms", industry: "Social Media", location: "Menlo Park", activeJobs: 18, icon: HardDrive },
        { id: 3, name: "Stripe", industry: "Fintech", location: "San Francisco", activeJobs: 12, icon: Cpu },
        { id: 4, name: "Tesla", industry: "Automotive", location: "Austin", activeJobs: 31, icon: Thunderbolt },
    ];

    return (
        <div>
            <h2 className='text-4xl'>Welcome Back, {user?.name}</h2>
            <DashboardStats statsData={recruiterStats} />
            <div className="max-w-7xl w-full p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Side Container: Wide Application List Table */}
                <div className="lg:col-span-2">
                    <RecentApplications applications={mockApplications} />
                </div>

                {/* Right Side Container: Compact Side Statistics List */}
                <div className="lg:col-span-1 h-full">
                    <TopCompanies companies={mockCompanies} />
                </div>
            </div>
        </div>

    );
};

export default RecruiterDashboardHomePage;