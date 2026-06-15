import React from 'react';
import CompanyDashboard from './CompanyDashboard';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async() => {

    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id);
    console.log("company before create", company);
    return (
        <div>
            <CompanyDashboard recruiter={user} recruiterCompany={company}/>
        </div>
    );
};

export default CompanyPage;