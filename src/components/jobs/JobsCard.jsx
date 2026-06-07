"use client";

import React from "react";
import { Card, Button, Avatar } from "@heroui/react";
import { Pin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

export default function JobCard({ job }) {
  // Fallback in case no prop is provided to prevent crashing
  if (!job) return null;

  // Format salary utility helper (e.g., 165k–245k BDT)
  const formatSalary = (min, max, currency) => {
    if (!min || !max) return "Negotiable";
    return `${(min / 1000).toFixed(0)}k–${(max / 1000).toFixed(0)}k ${currency}`;
  };

  // Determine description display text
  const displayDescription = typeof job.description === "object" 
    ? job.description.responsibilities 
    : job.description;
  
    console.log(job, "jobs from card");

  return (
    <Card className="w-full max-w-[400px] bg-[#121212] border border-neutral-800 text-white p-5 rounded-2xl shadow-xl transition-all hover:border-neutral-700">
      
      {/* Card Header: Company Logo, Name and Job Title */}
      <Card.Header className="flex flex-col items-start gap-3 p-0 pb-3">
        <div className="flex items-center gap-3">
          {job?.CompanyLogo && (
            <Image
              src={job?.CompanyLogo || "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"}
              alt={`${job?.CompanyName || "Company"} logo`}
              width={20}
              height={20}
              className="w-8 h-8 object-contain rounded-md"
            />
          )}
          <span className="text-sm font-medium text-neutral-400">
            {job?.CompanyName || "Secret Company"}
          </span>
        </div>
        
        <div className="w-full mt-1">
          <Card.Title className="text-2xl font-bold tracking-tight text-neutral-100">
            {job?.title}
          </Card.Title>
          {displayDescription && (
            <Card.Description className="text-sm text-neutral-400 mt-2 line-clamp-2">
              {displayDescription}
            </Card.Description>
          )}
        </div>
      </Card.Header>

      {/* Card Content: Metadata Badges/Pills */}
      <Card.Content className="flex flex-wrap gap-2 p-0 py-4">
        {/* Location Badge (Handles On-site vs Remote dynamically) */}
        <div className="flex items-center gap-1.5 bg-[#1c1c1e] text-neutral-200 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800/60">
          <Pin className="w-3.5 h-3.5 text-pink-400" />
          <span>
            {job.location?.type === "Remote" 
              ? "Remote" 
              : `${job.location?.city || "Global"}, ${job.location?.country || ""}`}
          </span>
        </div>

        {/* Job Type Badge */}
        <div className="flex items-center gap-1.5 bg-[#1c1c1e] text-neutral-200 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800/60">
          <Briefcase className="w-3.5 h-3.5 text-pink-400" />
          <span>{job.type || "Full-time"}</span>
        </div>

        {/* Salary Badge */}
        <div className="flex items-center gap-1.5 bg-[#1c1c1e] text-neutral-200 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800/60">
          <CircleDollar className="w-3.5 h-3.5 text-pink-400" />
          <span>{formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency)}</span>
        </div>
      </Card.Content>

      {/* Card Footer: Action Buttons / Apply Link */}
      <Card.Footer className="flex items-center justify-between p-0 pt-4 border-t border-neutral-900">
        <span className="text-xs text-neutral-500">
          Deadline: {job.deadline || "N/A"}
        </span>
        <Button 
          variant="light" 
          className="text-white hover:text-neutral-300 font-semibold text-sm p-0 gap-2 h-auto min-w-0 bg-transparent transition-opacity hover:opacity-80"
          endContent={<ArrowRight className="w-4 h-4" />}
          onPress={() => {
            // Setup application routing logic here 
            console.log(`Applying for Job ID: ${job.companyId}`);
          }}
        >
          Apply Now
        </Button>
      </Card.Footer>

    </Card>
  );
}