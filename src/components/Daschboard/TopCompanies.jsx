import React from 'react';
import { Button } from '@heroui/react';

export default function TopCompanies({ companies = [] }) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 w-full flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white tracking-tight">My Top Companies</h3>
          <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            View all
          </button>
        </div>

        <div className="space-y-5 mb-6">
          {companies.map((company, index) => {
            const CompanyIcon = company.icon;
            
            return (
              <div key={company.id || index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Company Logo/Icon Box */}
                  <div className="w-11 h-11 bg-[#27272a] border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 shrink-0">
                    {CompanyIcon ? <CompanyIcon className="w-5 h-5" /> : <span className="text-xs font-bold">{company.name[0]}</span>}
                  </div>
                  
                  {/* Company Text Context */}
                  <div>
                    <h4 className="font-semibold text-white text-sm leading-snug">{company.name}</h4>
                    <p className="text-xs text-zinc-500 leading-normal">{company.industry} • {company.location}</p>
                  </div>
                </div>

                {/* Job Counts */}
                <div className="text-right">
                  <span className="block font-bold text-white text-sm leading-none mb-1">{company.activeJobs}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Active Jobs</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero UI Button */}
      <Button 
        className="w-full bg-transparent border border-[#27272a] hover:border-zinc-700 text-zinc-300 font-medium text-sm rounded-xl py-5 transition-colors"
      >
        View All Companies
      </Button>
    </div>
  );
}
