"use client";

import React, { useState, useMemo } from 'react';
import JobCard from "@/components/jobs/JobsCard";
import JobFilters from './JobFilters';

export default function FilteredJobsContainer({ jobs, searchQuery }) {
  // Store the active filter criteria
  const [filters, setFilters] = useState({
    search: "",
    jobType: "all",
    category: "all",
    salaryRange: "all",
  });

  // Handle client-side filtering instantly using useMemo
  // const jobs = useMemo(() => {
  //   if (!jobs) return [];

  //   return jobs.filter((job) => {
  //     // 1. Text Search (Matches Title or Company Name)
  //     const searchLower = filters.search.toLowerCase();
  //     const matchesSearch =
  //       job.title?.toLowerCase().includes(searchLower) ||
  //       job.CompanyName?.toLowerCase().includes(searchLower);

  //     // 2. Job Type Match (Remote, Full-time, etc.)
  //     // Note: mapping 'all' or standard casing checks
  //     const matchesType = 
  //       filters.jobType === "all" || 
  //       job.type?.toLowerCase() === filters.jobType.toLowerCase();

  //     // 3. Category Match
  //     const matchesCategory = 
  //       filters.category === "all" || 
  //       job.category?.toLowerCase() === filters.category.toLowerCase();

  //     // 4. Salary Range Match
  //     let matchesSalary = true;
  //     const minSalary = job.salary?.min || 0;
      
  //     if (filters.salaryRange === "0-100k") {
  //       matchesSalary = minSalary < 100000;
  //     } else if (filters.salaryRange === "100k-150k") {
  //       matchesSalary = minSalary >= 100000 && minSalary <= 150000;
  //     } else if (filters.salaryRange === "150k+") {
  //       matchesSalary = minSalary > 150000;
  //     }

  //     return matchesSearch && matchesType && matchesCategory && matchesSalary;
  //   });
  // }, [filters, jobs]);


  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Filter Input Controls bar */}
      <JobFilters onFilterChange={(newFilters) => setFilters(newFilters)} filters={searchQuery}/>

      {/* 2. Dynamic Results Count */}
      <div className="text-zinc-500 text-sm pl-2">
        Showing {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
      </div>

      {/* 3. Filtered Layout Display */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            // Using your dynamic database identification standard _id or _id.$oid fallback safely
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
      ) : (
        /* Empty States layout */
        <div className="text-center py-10 border border-dashed border-zinc-800 rounded-2xl bg-[#121212]/30">
          <p className="text-zinc-500 text-lg">No jobs found.</p>
          <p className="text-zinc-500 text-lg">No positions match your selected filter criteria.</p>
        </div>
      )}
    </div>
  );
}