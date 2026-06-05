import { getCompanyJobs } from '@/lib/api/jobs';
import { Eye, PencilToLine, TrashBin } from '@gravity-ui/icons';
import { Button, Table } from '@heroui/react';
import React from 'react';

const RecruiterJobs = async () => {
    const companyId = "co_984723984";
    const jobs = await getCompanyJobs(companyId);
    console.log(jobs);
    return (
        <div>
            <h1>Recruiter/Company Manage All Jobs</h1>
            <div className='p-4'>
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Team members" className="min-w-[600px]">
                            <Table.Header>
                                <Table.Column isRowHeader>Job Title</Table.Column>
                                <Table.Column>Category</Table.Column>
                                <Table.Column>Type</Table.Column>
                                <Table.Column>Salary</Table.Column>
                                <Table.Column>Deadline</Table.Column>
                                <Table.Column>Status</Table.Column>
                                <Table.Column>Actions</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {jobs.map((job, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{job.title}</Table.Cell>
                                        <Table.Cell>{job.category.charAt(0).toUpperCase() + job.category.slice(1)}</Table.Cell>
                                        <Table.Cell>{job.type.charAt(0).toUpperCase() + job.type.slice(1)}</Table.Cell>
                                        <Table.Cell>${job.salary.min} - ${job.salary.max}</Table.Cell>
                                        <Table.Cell>{job.deadline}</Table.Cell>
                                        <Table.Cell>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex gap-2'>
                                                <Button variant='outline' className=" "><Eye /></Button>
                                                <Button variant='outline' className=" border border-green-500  text-green-500"><PencilToLine /></Button>
                                                <Button variant='outline' className=" border border-red-500 text-red-500"><TrashBin /></Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default RecruiterJobs;