"use client";

import React, { useState } from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError, TextArea } from '@heroui/react';
// Importing Gravity UI icons
import { Paperclip, ArrowUpRight, TrashBin } from '@gravity-ui/icons';
import { submitApplication } from '@/lib/actions/application';
import { toast } from 'react-toastify';

const JobApply = ({ job, applicant }) => {
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [resumeLink, setResumeLink] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        // Construct submission payload
        const formData = {
            jobId: job?._id,
            jobTitle: job?.title,
            applicantId: applicant?.id,
            companyName: job?.CompanyName,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            resumeLink: resumeLink,
            additionalInfo: additionalInfo
        };

        console.log("Submitting Application:", formData);
        // Handle your API submission logic here
        const res = await submitApplication(formData);
        if(res.insertedId) {
            toast.success("Application submitted successfully!");
            handleReset();
        }
    };

    const handleReset = () => {
        setResumeLink("");
        setAdditionalInfo("");
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
            {/* Header section with provided applicant & job details */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    Apply for {job?.title || "Position"}
                </h1>
                {applicant && (
                    <p className="text-sm text-zinc-500 mt-1">
                        Applying as: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{applicant.name}</span> ({applicant.email})
                    </p>
                )}
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />

            {/* Hero UI Form wrapper */}
            <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Resume Link Field */}
                <TextField className="w-full flex flex-col gap-1.5" isRequired>
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                        <Paperclip className="w-4 h-4 text-zinc-400" />
                        Resume Link
                    </Label>
                    <div className="relative flex items-center">
                        <Input 
                            type="url"
                            placeholder="https://drive.google.com/... or https://dropbox.com/..."
                            value={resumeLink}
                            onChange={(e) => setResumeLink(e.target.value)}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-sm"
                            required
                        />
                    </div>
                    <Description className="text-xs text-zinc-400">
                        Please provide a publicly accessible link to your PDF resume (e.g., Google Drive, Dropbox).
                    </Description>
                    <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                {/* Optional Additional Info (Controlled TextArea) */}
                <div className="flex flex-col gap-1.5 w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Cover Letter / Additional Information <span className="text-zinc-400 text-xs">(Optional)</span>
                    </Label>
                    <TextArea
                        aria-describedby="textarea-additional-info"
                        aria-label="Additional Information"
                        placeholder="Tell us why you are a great fit for this role..."
                        value={additionalInfo}
                        onChange={(event) => setAdditionalInfo(event.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-sm min-h-[120px] resize-y"
                    />
                    <div className="flex justify-between items-center mt-1">
                        <Description id="textarea-additional-info" className="text-xs text-zinc-400">
                            Add anything else you'd like the hiring team to see.
                        </Description>
                        <span className="text-xs text-zinc-400 font-mono">
                            {additionalInfo.length} / 1000
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 mt-4">
                    <Button 
                        type="button" 
                        onClick={handleReset}
                        className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                        <TrashBin className="w-4 h-4" />
                        Clear Form
                    </Button>
                    
                    <Button 
                        type="submit"
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                        Submit Application
                        <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default JobApply;