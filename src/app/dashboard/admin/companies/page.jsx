import { getCompanies } from '@/lib/api/companies';
import React from 'react';
import CompanyTable from './CompanyTable'; // Importing the table UI component

const AdminCompaniesPage = async () => {
    const companies = await getCompanies();

    return (
        <div className="w-full min-h-screen bg-[#121212] text-[#e0e0e0] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold tracking-wide text-white">Companies for Review</h2>
                    <p className="text-sm text-neutral-400 mt-1">Total Requests: {companies.length}</p>
                </div>
                
                <CompanyTable companies={companies} />
            </div>
        </div>
    );
};

export default AdminCompaniesPage;