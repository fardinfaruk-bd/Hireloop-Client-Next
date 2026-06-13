import React from 'react';
import Link from 'next/link';
import { Table, Chip, Button } from '@heroui/react';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';

// Helper function to format MongoDB ISODate strings cleanly
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const ApplicationPage = async () => {
  const user = await getUserSession();
  // Safe fallback to an empty array if the API returns undefined/null
  const applications = (await getApplicationsByApplicant(user?.id)) || [];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 min-h-screen text-foreground bg-[#121212]">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Applications</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Showing {applications.length} {applications.length === 1 ? 'application' : 'applications'} submitted by you.
        </p>
      </div>

      {/* Conditional Rendering: Table vs Stylish Empty State */}
      {applications.length > 0 ? (
        <div className="w-full overflow-hidden border border-neutral-800 rounded-xl bg-[#18181b]">
          <Table aria-label="Job Applications Table" className="w-full">
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header>
                  <Table.Column isRowHeader className="bg-[#1f1f23] text-neutral-400 font-semibold text-sm py-4 border-b border-neutral-800">Job Title</Table.Column>
                  <Table.Column className="bg-[#1f1f23] text-neutral-400 font-semibold text-sm py-4 border-b border-neutral-800">Company</Table.Column>
                  <Table.Column className="bg-[#1f1f23] text-neutral-400 font-semibold text-sm py-4 border-b border-neutral-800">Applied Date</Table.Column>
                  <Table.Column className="bg-[#1f1f23] text-neutral-400 font-semibold text-sm py-4 border-b border-neutral-800">Status</Table.Column>
                  <Table.Column align="end" className="bg-[#1f1f23] text-neutral-400 font-semibold text-sm py-4 border-b border-neutral-800">Action</Table.Column>
                </Table.Header>

                <Table.Body>
                  {applications.map((application, index) => (
                    <Table.Row key={index} className="hover:bg-neutral-900/40 transition-colors">
                      {/* Job Title Column */}
                      <Table.Cell className="py-4 border-b border-neutral-800/60">
                        <div className="font-medium text-white text-sm">{application.jobTitle}</div>
                        <div className="text-xs text-neutral-400 mt-0.5">Full-time • Remote</div>
                      </Table.Cell>

                      {/* Company Column */}
                      <Table.Cell className="py-4 border-b border-neutral-800/60 text-neutral-300 text-sm">
                        {application.companyName}
                      </Table.Cell>

                      {/* Applied Date Column */}
                      <Table.Cell className="py-4 border-b border-neutral-800/60 text-neutral-400 text-sm">
                        {formatDate(application.createAt)}
                      </Table.Cell>

                      {/* Status Column */}
                      <Table.Cell className="py-4 border-b border-neutral-800/60">
                        <Chip
                          variant="flat"
                          className="border border-neutral-700 bg-neutral-800/50 text-neutral-200 text-xs px-2 h-6"
                        >
                          Applied
                        </Chip>
                      </Table.Cell>

                      {/* Action Column */}
                      <Table.Cell className="py-4 border-b border-neutral-800/60">
                        <Link
                          href={`/jobs/${application.jobId}`}
                          className="text-neutral-400 hover:text-white text-sm group h-8 min-w-0 px-3 transition-colors inline-flex items-center"
                        >
                          Details
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      ) : (
        /* --- STYLISH EMPTY STATE --- */
        <div className="w-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-neutral-800 rounded-2xl bg-[#18181b]/50 backdrop-blur-sm min-h-[400px]">
          {/* Minimalist Graphic Icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 mb-5 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-neutral-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 19.5 21h-15a2.25 2.25 0 0 1-2.25-2.25v-4.5a2.25 2.25 0 0 1 2.25-2.25m10.5-11.25h.008v.008h-.008V4.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM12 9.75m-2.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0-4.5 0Z" />
            </svg>
          </div>

          {/* Heading & Text */}
          <h3 className="text-lg font-medium text-white tracking-tight">No applications yet</h3>
          <p className="text-sm text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
            You have not applied to any job postings. Start exploring open opportunities to launch your next career move.
          </p>

          {/* Call to Action Button */}
          <Link
            href="/jobs">
            <Button
              variant="solid"
              className="mt-6 bg-white text-black font-medium hover:bg-neutral-200 transition-all rounded-lg text-sm px-5 h-10 shadow-lg"
            >
              Browse Available Jobs
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ApplicationPage;