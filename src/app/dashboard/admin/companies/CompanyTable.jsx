'use client';

import React from 'react';
import { Table, Button } from '@heroui/react';
import { updateCompany } from '@/lib/actions/companies';
import { toast } from 'react-toastify';

const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return { dot: 'bg-emerald-500', text: 'text-emerald-500' };
        case 'rejected':
            return { dot: 'bg-rose-500', text: 'text-rose-500' };
        case 'pending':
        default:
            return { dot: 'bg-amber-500', text: 'text-amber-500' };
    }
};

const CompanyTable = ({ companies }) => {
    const handleApprove = async(id) => {
        const result = await updateCompany(id, {status : "Approved"});
        if(result.modifiedCount){
            toast.success("Company approved successfully!");
        }
    };
    const handleReject = async(id) => {
        const result = await updateCompany(id, {status : "Rejected"});
        if(result.modifiedCount){
            toast.success("Company rejected successfully!");
        }
    }
    console.log(companies)
    return (
        <Table className="bg-[#18181c] border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
            <Table.ScrollContainer>
                <Table.Content aria-label="Company Approval Table">
                    <Table.Header className="bg-[#1e1e24] border-b border-neutral-800">
                        {/* Add isRowHeader here to fix the crash */}
                        <Table.Column isRowHeader className="text-neutral-400 font-medium py-4 px-6 text-left">
                            Company Name
                        </Table.Column>
                        <Table.Column className="text-neutral-400 font-medium py-4 px-6 text-left">Recruiter Email</Table.Column>
                        <Table.Column className="text-neutral-400 font-medium py-4 px-6 text-left">Industry</Table.Column>
                        <Table.Column className="text-neutral-400 font-medium py-4 px-6 text-left">Status</Table.Column>
                        <Table.Column className="text-neutral-400 font-medium py-4 px-6 text-left">Date Submitted</Table.Column>
                        <Table.Column className="text-neutral-400 font-medium py-4 px-6 text-right">Actions</Table.Column>
                    </Table.Header>
                    
                    <Table.Body>
                        {companies.map((company) => {
                            const statusStyle = getStatusStyles(company.status);
                            const initials = company.name ? company.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'CO';
                            const formattedDate = "Oct 12, 2023"; 
                            const recruiterEmail = company.recruiterEmail || `recruiter_${company.recruiterId?.slice(-4) || 'user'}@domain.com`;

                            return (
                                <Table.Row key={company._id} className="border-b border-neutral-800/60 hover:bg-neutral-800/20 transition-colors">
                                    <Table.Cell className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 flex items-center justify-center bg-neutral-800 border border-neutral-700 text-neutral-300 font-semibold rounded-md text-xs tracking-wider">
                                                {company.logo ? (
                                                    <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" onError={(e) => { e.target.style.display = 'none'; }} />
                                                ) : initials}
                                            </div>
                                            <span className="font-medium text-white tracking-wide text-sm">{company.name}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-6 text-neutral-400 text-sm">{recruiterEmail}</Table.Cell>

                                    <Table.Cell className="py-4 px-6">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-neutral-400 bg-neutral-800/40 border border-neutral-800">
                                            {company.industry || "Technology"}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                                            <span className={`text-sm font-medium ${statusStyle.text}`}>{company.status}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-6 text-neutral-400 text-sm">{formattedDate}</Table.Cell>

                                    <Table.Cell className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {company.status !== 'Approved' && (
                                                <Button size="sm" onPress={() => handleApprove(company._id)} className="bg-[#0f2e1e] hover:bg-[#143d28] text-emerald-400 text-xs font-semibold px-4 rounded-md h-8">
                                                    Approve
                                                </Button>
                                            )}
                                            {company.status !== 'Rejected' && (
                                                <Button size="sm" onPress={() => handleReject(company._id)} className="bg-[#2d1416] hover:bg-[#3d1a1d] text-rose-400 text-xs font-semibold px-4 rounded-md h-8">
                                                    Reject
                                                </Button>
                                            )}
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default CompanyTable;