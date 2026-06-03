import React from 'react';
import { Table } from '@heroui/react'; // Clean Hero UI v3 root import

export default function RecentApplications({ applications = [] }) {
  // Status chip styling map matching your design
  const statusStyles = {
    Interviewing: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    New: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
    Reviewing: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Rejected: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  };

  // Helper to extract user initials for the placeholder avatar
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white tracking-tight">Recent Applications</h3>
        <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
          View all
        </button>
      </div>

      {/* 1. Root Element acts strictly as a styling/theming boundary wrapper in v3 */}
      <Table variant="unstyled" className="w-full text-left">
        {/* 2. REQUIRED: Custom wrapper handling scroll physics/bars uniformly */}
        <Table.ScrollContainer>
          {/* 3. REQUIRED: Accessible collection primitive (aria props move here) */}
          <Table.Content aria-label="Recent job applications data list">
            
            <Table.Header>
              <Table.Column className="pb-4 text-sm font-medium text-zinc-500 bg-transparent">Candidate Name</Table.Column>
              <Table.Column className="pb-4 text-sm font-medium text-zinc-500 bg-transparent">Role</Table.Column>
              <Table.Column className="pb-4 text-sm font-medium text-zinc-500 bg-transparent">Date Applied</Table.Column>
              <Table.Column className="pb-4 text-sm font-medium text-zinc-500 bg-transparent">Experience</Table.Column>
              <Table.Column className="pb-4 text-sm font-medium text-zinc-500 bg-transparent text-right">Status</Table.Column>
            </Table.Header>

            <Table.Body>
              {applications.map((app, index) => (
                /* Note: Hero UI v3 changes collection mapping tracking from "key" to "id" */
                <Table.Row 
                key={index}
                  id={app.id || String(index)} 
                  className="border-t border-[#27272a] last:border-b-0 hover:bg-zinc-900/40 transition-colors"
                >
                  {/* Candidate Info with Placeholder Avatar */}
                  <Table.Cell className="py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
                      {getInitials(app.name)}
                    </div>
                    <span className="font-semibold text-white text-sm">{app.name}</span>
                  </Table.Cell>

                  <Table.Cell className="py-4 text-sm text-zinc-400">
                    {app.role}
                  </Table.Cell>

                  <Table.Cell className="py-4 text-sm text-zinc-400">
                    {app.dateApplied}
                  </Table.Cell>

                  <Table.Cell className="py-4 text-sm text-zinc-400">
                    {app.experience}
                  </Table.Cell>

                  {/* Dynamic Status Badge */}
                  <Table.Cell className="py-4 text-right">
                    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[app.status] || statusStyles.New}`}>
                      {app.status}
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}