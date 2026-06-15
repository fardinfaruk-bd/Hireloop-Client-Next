"use client";

import React, { useState } from 'react';
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  FieldError,
  Button,
  Card,
} from '@heroui/react';
import { Briefcase, Pin, FileText, CircleCheckFill, ArrowUpRight, CircleXmarkFill, ArrowsRotateLeft } from '@gravity-ui/icons';
import { createJob } from '@/lib/actions/jobs';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { PersonStanding } from 'lucide-react';


export default function PostJobForm({ company }) {

  console.log("company info", company);


  const [isRemote, setIsRemote] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formRawEntries = Object.fromEntries(formData);

    const jobPayload = {
      title: formRawEntries.jobTitle,
      category: formRawEntries.jobCategory,
      type: formRawEntries.jobType,
      salary: {
        min: Number(formRawEntries.salaryMin),
        max: Number(formRawEntries.salaryMax),
        currency: formRawEntries.currency
      },
      location: isRemote ? { type: "Remote" } : { type: "On-site", city: formRawEntries.city, country: formRawEntries.country },
      deadline: formRawEntries.deadline,
      description: {
        responsibilities: formRawEntries.responsibilities,
        requirements: formRawEntries.requirements,
        benefits: formRawEntries.benefits || ""
      },
      companyId: company._id,
      CompanyName: company.name,
      CompanyLogo: company.logo,
      status: "active",
      isPublic: true,
    };

    const res = await createJob(jobPayload);
    if (res.insertedId) {
      toast.success("Job posted successfully!");
      e.target.reset();
      redirect("/dashboard/recruiter/jobs");
    }
  };

  return (
    <div className="bg-[#09090b] min-h-screen text-white p-6 sm:p-10 flex justify-center items-start">
      <div className="max-w-4xl w-full space-y-8">

        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Post a New Job</h1>
          <p className="text-sm text-zinc-400 mt-1">Enter your operational role parameters to push an opening to the live job board.</p>
        </div>
        <div className="p-4 bg-[#0d0d0f] border border-[#27272a] rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
          <div className="space-y-0.5">
            <span className="text-[10px] tracking-wider uppercase font-bold text-zinc-500">Posting Organization</span>
            <h4 className="text-sm font-semibold text-zinc-200">{company.name}</h4>
          </div>
          {company.status === "Approved" ? (<div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-full px-3 py-1 text-xs font-medium select-none">
            <CircleCheckFill className="w-3.5 h-3.5 shrink-0" />
            Organization Account Approved
          </div>) : (<div className="flex items-center gap-2 bg-rose-500/10 text-rose-400 border border-rose-500/25 rounded-full px-3 py-1 text-xs font-medium select-none">
            <CircleXmarkFill className="w-3.5 h-3.5 shrink-0" />
            <p>Organization Account Pending</p>
          </div>
          )}
        </div>

        {company.status === "Approved" ? <Form
          onSubmit={handleJobSubmit}
          validationBehavior="aria"
          className="space-y-8 bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          {/* Section 1: Job Info */}
          <Fieldset className="w-full gap-0">
            <div className="flex items-center gap-2 pb-3 border-b border-[#27272a] w-full mb-4">
              <Briefcase className="w-5 h-5 text-zinc-400" />
              <Fieldset.Legend className="text-base font-medium text-zinc-200 m-0">Job Information</Fieldset.Legend>
            </div>

            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <TextField isRequired name="jobTitle" className="md:col-span-2 flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Job Title</Label>
                <Input placeholder="e.g., Senior Full Stack Engineer" className="bg-[#212124] border border-[#27272a] rounded-xl text-white px-4 py-2 text-sm w-full" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* Job Category Select Option */}
              <Select name="jobCategory" placeholder="Select Category" className="flex flex-col gap-1.5 w-full">
                <Label className="text-xs font-medium text-zinc-400">Job Category</Label>
                <Select.Trigger className="bg-[#212124] border border-[#27272a] rounded-xl text-white text-sm px-4 py-2.5 flex justify-between items-center w-full">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl text-sm min-w-[200px]">
                  <ListBox>
                    <ListBox.Item id="engineering" textValue="Software Engineering" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Software Engineering</ListBox.Item>
                    <ListBox.Item id="design" textValue="Product Design" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Product Design</ListBox.Item>
                    <ListBox.Item id="marketing" textValue="Growth & Marketing" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Growth & Marketing</ListBox.Item>
                    <ListBox.Item id="product" textValue="Product Management" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Product Management</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Job Type Select Option */}
              <Select name="jobType" placeholder="Select Type" className="flex flex-col gap-1.5 w-full">
                <Label className="text-xs font-medium text-zinc-400">Job Type</Label>
                <Select.Trigger className="bg-[#212124] border border-[#27272a] rounded-xl text-white text-sm px-4 py-2.5 flex justify-between items-center w-full">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl text-sm min-w-[200px]">
                  <ListBox>
                    <ListBox.Item id="Full-time" textValue="Full-time" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Full-time</ListBox.Item>
                    <ListBox.Item id="Part-time" textValue="Part-time" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Part-time</ListBox.Item>
                    <ListBox.Item id="Contract" textValue="Contract" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Contract</ListBox.Item>
                    <ListBox.Item id="Internship" textValue="Internship" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Internship</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Salary Setup Details */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0d0d0f] border border-[#27272a] p-4 rounded-xl">
                <TextField isRequired name="salaryMin" type="number" className="flex flex-col gap-1">
                  <Label className="text-xs font-medium text-zinc-400">Minimum Salary</Label>
                  <Input placeholder="e.g. 50000" className="bg-[#212124] border border-[#27272a] rounded-lg text-white px-3 py-1.5 text-sm" />
                </TextField>

                <TextField isRequired name="salaryMax" type="number" className="flex flex-col gap-1">
                  <Label className="text-xs font-medium text-zinc-400">Maximum Salary</Label>
                  <Input placeholder="e.g. 90000" className="bg-[#212124] border border-[#27272a] rounded-lg text-white px-3 py-1.5 text-sm" />
                </TextField>

                {/* Currency Selection Block */}
                <Select name="currency" placeholder="USD" className="flex flex-col gap-1">
                  <Label className="text-xs font-medium text-zinc-400">Currency</Label>
                  <Select.Trigger className="bg-[#212124] border border-[#27272a] rounded-lg text-white text-sm px-3 py-1.5 flex justify-between items-center w-full">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl text-sm min-w-[120px]">
                    <ListBox defaultSelectedKeys={["USD"]}>
                      <ListBox.Item id="USD" textValue="USD ($)" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">USD ($)</ListBox.Item>
                      <ListBox.Item id="EUR" textValue="EUR (€)" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">EUR (€)</ListBox.Item>
                      <ListBox.Item id="GBP" textValue="GBP (£)" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">GBP (£)</ListBox.Item>
                      <ListBox.Item id="BDT" textValue="BDT (৳)" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">BDT (৳)</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Location Visibility Switch Toggle */}
              <div className="md:col-span-2 flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="remoteToggle"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 accent-zinc-400 text-zinc-950 cursor-pointer"
                  />
                  <label htmlFor="remoteToggle" className="text-sm font-medium text-zinc-300 cursor-pointer select-none">
                    This position is 100% remote / work from home
                  </label>
                </div>

                {!isRemote && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField isRequired={!isRemote} name="city" className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-zinc-400">City</Label>
                      <Input placeholder="e.g., Mountain View" className="bg-[#212124] border border-[#27272a] rounded-xl text-white px-4 py-2 text-sm" />
                    </TextField>
                    <TextField isRequired={!isRemote} name="country" className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-zinc-400">Country</Label>
                      <Input placeholder="e.g., United States" className="bg-[#212124] border border-[#27272a] rounded-xl text-white px-4 py-2 text-sm" />
                    </TextField>
                  </div>
                )}
              </div>

              <TextField isRequired name="deadline" type="date" className="md:col-span-2 flex flex-col gap-1.5 mt-2">
                <Label className="text-xs font-medium text-zinc-400">Application Deadline</Label>
                <Input className="bg-[#212124] border border-[#27272a] rounded-xl text-zinc-400 w-full px-4 py-2 text-sm" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>
            </Fieldset.Group>
          </Fieldset>

          {/* Section 2: Job Description */}
          <Fieldset className="w-full gap-0">
            <div className="flex items-center gap-2 pb-3 border-b border-[#27272a] w-full mb-4">
              <FileText className="w-5 h-5 text-zinc-400" />
              <Fieldset.Legend className="text-base font-medium text-zinc-200 m-0">Job Description Breakdown</Fieldset.Legend>
            </div>

            <Fieldset.Group className="flex flex-col gap-5 w-full">
              <TextField isRequired name="responsibilities" className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Core Responsibilities</Label>
                <TextArea placeholder="Outline the expected daily engineering tasks..." rows={4} className="bg-[#212124] border border-[#27272a] rounded-xl text-white w-full p-4 text-sm" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField isRequired name="requirements" className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Candidate Requirements</Label>
                <TextArea placeholder="Identify necessary programming language profiles..." rows={4} className="bg-[#212124] border border-[#27272a] rounded-xl text-white w-full p-4 text-sm" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField name="benefits" className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Perks & Benefits <span className="text-zinc-500 font-normal">(Optional)</span></Label>
                <TextArea placeholder="Describe your health insurance tiers..." rows={3} className="bg-[#212124] border border-[#27272a] rounded-xl text-white w-full p-4 text-sm" />
              </TextField>
            </Fieldset.Group>
          </Fieldset>




          {/* Footer controls */}
          <div className="pt-4 flex justify-end items-center gap-3 border-t border-[#27272a] w-full">
            <Button type="button" className="bg-transparent border border-[#27272a] hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-white hover:bg-zinc-200 text-zinc-950 font-medium px-6 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 disabled:opacity-50">
              {loading ? "Publishing..." : "Register & Post"}
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </Form> : <Card className="flex h-56 items-center justify-center rounded-2xl border shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-blue-100 p-4">
              <ArrowsRotateLeft className="h-10 w-10 text-blue-600" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold ">
                Approval Pending
              </h3>

              <p className="max-w-xs text-sm text-slate-500">
                Your account is currently under review. Please wait while we process
                your approval request.
              </p>
            </div>
          </div>
        </Card>}
      </div>
    </div>
  );
}