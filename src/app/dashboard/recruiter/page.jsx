"use client";
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import { DashboardStats } from '@/components/Daschboard/DashboardStats';

const RecruiterDashboardHomePage = () => {
    const  { data: session, isPending} = authClient.useSession();

    if (isPending) {
        return <div>Loading...</div>;
    }

    const user = session?.user;
    console.log(user);

    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];

    return (
        <div>
            <h2 className='text-4xl'>Welcome Back, {user?.name}</h2>
            <DashboardStats statsData={recruiterStats} />
        </div>

    );
};

export default RecruiterDashboardHomePage;