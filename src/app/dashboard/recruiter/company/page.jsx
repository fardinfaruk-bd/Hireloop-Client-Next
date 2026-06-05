"use client";

import React, { useState, useRef } from "react";
import { 
  Form, 
  Fieldset, 
  TextField, 
  Label, 
  Input, 
  TextArea, 
  FieldError, 
  Select, 
  ListBox, 
  Button 
} from "@heroui/react"; // Assuming import maps match Hero UI syntax
import { 
  Factory, 
  Globe, 
  ArrowUpRight, 
  CloudArrowUpIn, 
  Pencil, 
  CircleCheckFill, 
  Clock, 
  CircleXmarkFill 
} from "@gravity-ui/icons";

import { createCompany } from "@/lib/api/companies";
import { toast } from "react-toastify";

export default function CompanyDashboard() {
  // Mock State for Company Data (replace with database fetching / better-auth session logic)
  const [company, setCompany] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const fileInputRef = useRef(null);

  // Status badge config matcher
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-full px-3 py-1 text-xs font-medium">
            <CircleCheckFill className="w-3.5 h-3.5" /> Approved
          </div>
        );
      case "Rejected":
        return (
          <div className="flex items-center gap-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/25 rounded-full px-3 py-1 text-xs font-medium">
            <CircleXmarkFill className="w-3.5 h-3.5" /> Rejected
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-full px-3 py-1 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" /> Pending Approval
          </div>
        );
    }
  };

  // ImgBB Image Upload Handler
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional client-side verification
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Replace with your runtime environment variable (e.g., process.env.NEXT_PUBLIC_IMGBBB_API_KEY)
      const IMGBBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setLogoPreview(result.data.url);
      } else {
        console.error("Upload failed", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      name: formData.get("companyName"),
      industry: formData.get("industry"),
      website: formData.get("websiteUrl"),
      location: formData.get("location"),
      employeeCount: formData.get("employeeCount"),
      description: formData.get("description"),
      logo: logoPreview || (company?.logo || ""),
      status: company?.status || "Pending" // Retain current status or reset to Pending on edits
    };

    const payload = await createCompany(updatedData); // Call server action to save data

    if(payload.insertedId){
      toast.success("Company profile created successfully! Awaiting admin approval.");
    }

    // Simulate Database Save delay
    setTimeout(() => {
      setCompany(updatedData);
      setIsEditing(false);
      setLoading(false);
    }, 800);
    console.log("Updated Company Data:", payload);
    
  };

  // --- STATE 1: Empty View (No Company Registered) ---
  if (!company && !isEditing) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-8 bg-[#18181b] border border-[#27272a] rounded-2xl text-center space-y-6">
        <div className="inline-flex p-4 bg-[#212124] rounded-full text-zinc-400 border border-[#27272a]">
          <Factory className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-zinc-100">No Company Workspace</h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            You need an active organization attached to your profile before you can start publishing jobs on HireLoop.
          </p>
        </div>
        <Button 
          onClick={() => { setLogoPreview(""); setIsEditing(true); }}
          className="bg-white hover:bg-zinc-200 text-zinc-950 font-medium px-6 py-2.5 rounded-xl text-sm transition-all"
        >
          Register Company
        </Button>
      </div>
    );
  }

  // --- STATE 2: Form View (Registering New or Editing Existing) ---
  if (isEditing) {
    return (
      <div className="max-w-3xl mx-auto my-8">
        <Form 
          onSubmit={handleFormSubmit} 
          validationBehavior="aria" 
          className="space-y-8 bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          <Fieldset className="w-full gap-0">
            {/* Header section matching attached UI style */}
            <div className="flex justify-between items-start pb-5 border-b border-[#27272a] w-full mb-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  {company ? "Edit Company Details" : "Register New Company"}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">Enter your business details to start hiring on HireLoop.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="text-zinc-500 hover:text-zinc-300 text-lg transition-colors p-1"
              >
                ✕
              </button>
            </div>

            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {/* Company Name */}
              <TextField isRequired name="companyName" defaultValue={company?.name || ""} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Company Name</Label>
                <Input placeholder="e.g. Acme Corp" className="bg-[#212124] border border-[#27272a] rounded-xl text-white px-4 py-2 text-sm w-full" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* Industry Selection */}
              <Select name="industry" defaultSelectedKeys={[company?.industry || "Technology"]} className="flex flex-col gap-1.5 w-full">
                <Label className="text-xs font-medium text-zinc-400">Industry / Category</Label>
                <Select.Trigger className="bg-[#212124] border border-[#27272a] rounded-xl text-white text-sm px-4 py-2.5 flex justify-between items-center w-full">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl text-sm min-w-[200px]">
                  <ListBox>
                    <ListBox.Item id="Technology" textValue="Technology" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Technology</ListBox.Item>
                    <ListBox.Item id="Design" textValue="Design" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Design</ListBox.Item>
                    <ListBox.Item id="Finance" textValue="Finance" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Finance</ListBox.Item>
                    <ListBox.Item id="Healthcare" textValue="Healthcare" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">Healthcare</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Website URL with static prefix mask */}
              <TextField isRequired name="websiteUrl" defaultValue={company?.website || ""} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Website URL</Label>
                <div className="flex rounded-xl overflow-hidden border border-[#27272a]">
                  <span className="bg-[#2a2a2e] text-zinc-400 px-4 py-2 text-sm select-none flex items-center justify-center border-r border-[#27272a]">https://</span>
                  <Input placeholder="www.company.com" className="bg-[#212124] text-white px-4 py-2 text-sm w-full outline-none border-none" />
                </div>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* Location */}
              <TextField isRequired name="location" defaultValue={company?.location || ""} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Location</Label>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-4 text-zinc-500">📍</span>
                  <Input placeholder="City, Country" className="bg-[#212124] border border-[#27272a] rounded-xl text-white pl-10 pr-4 py-2 text-sm w-full" />
                </div>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* Employee Count Range */}
              <Select name="employeeCount" defaultSelectedKeys={[company?.employeeCount || "1-10"]} className="flex flex-col gap-1.5 w-full">
                <Label className="text-xs font-medium text-zinc-400">Employee Count Range</Label>
                <Select.Trigger className="bg-[#212124] border border-[#27272a] rounded-xl text-white text-sm px-4 py-2.5 flex justify-between items-center w-full">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl text-sm min-w-[200px]">
                  <ListBox>
                    <ListBox.Item id="1-10" textValue="1-10 employees" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">1-10 employees</ListBox.Item>
                    <ListBox.Item id="11-50" textValue="11-50 employees" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">11-50 employees</ListBox.Item>
                    <ListBox.Item id="51-200" textValue="51-200 employees" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">51-200 employees</ListBox.Item>
                    <ListBox.Item id="201+" textValue="201+ employees" className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg cursor-pointer">201+ employees</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Logo Upload Block configured for ImgBB Integration */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-zinc-400">Company Logo</span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleLogoUpload} 
                  accept="image/png, image/jpeg" 
                  className="hidden" 
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-[#3f3f46] rounded-xl p-3 bg-[#212124]/30 hover:bg-[#212124]/60 transition-colors flex items-center gap-4 cursor-pointer min-h-[50px]"
                >
                  <div className="bg-[#212124] border border-[#27272a] w-12 h-12 rounded-lg flex items-center justify-center text-zinc-400 shrink-0 overflow-hidden">
                    {logoPreview || company?.logo ? (
                      <img src={logoPreview || company?.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                    ) : (
                      <CloudArrowUpIn className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-200">
                      {loading ? "Processing..." : logoPreview || company?.logo ? "Change image" : "Upload image"}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <TextField isRequired name="description" defaultValue={company?.description || ""} className="md:col-span-2 flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-zinc-400">Brief Description</Label>
                <TextArea placeholder="Tell us about your company's mission and culture..." rows={4} className="bg-[#212124] border border-[#27272a] rounded-xl text-white w-full p-4 text-sm resize-none" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>
            </Fieldset.Group>
          </Fieldset>

          {/* Action buttons matching design footer elements */}
          <div className="pt-4 flex justify-end items-center gap-3 border-t border-[#27272a] w-full">
            <Button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="bg-transparent border border-[#27272a] hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading} 
              className="bg-white hover:bg-zinc-200 text-zinc-950 font-medium px-6 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? "Saving Workspace..." : company ? "Update Company" : "Register Company"}
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  // --- STATE 3: Read-Only Overview Display ---
  return (
    <div className="max-w-3xl mx-auto my-8 space-y-6">
      {/* Dynamic Workspace Panel Header */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-[#212124] border border-[#27272a] rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
            {company.logo ? (
              <img src={company.logo} alt={`${company.name} Logo`} className="w-full h-full object-cover" />
            ) : (
              <Factory className="w-6 h-6 text-zinc-400" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold text-zinc-100">{company.name}</h1>
              {getStatusBadge(company.status)}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
              <span className="flex items-center gap-1">🏷️ {company.industry}</span>
              <span className="flex items-center gap-1">📍 {company.location}</span>
              <span className="flex items-center gap-1">👥 {company.employeeCount} range</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => { setLogoPreview(company.logo); setIsEditing(true); }}
          className="bg-[#212124] hover:bg-zinc-800 border border-[#27272a] text-zinc-200 text-xs font-medium py-2 px-4 rounded-xl flex items-center gap-2 transition-colors self-end md:self-auto"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit Profile
        </Button>
      </div>

      {/* Description Context Card */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#27272a] pb-3">
          <Globe className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-300">Corporate Details & Mission</h3>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
          {company.description}
        </p>
        <div className="pt-2">
          <a 
            href={`https://${company.website}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors"
          >
            Visit external workspace (https://{company.website}) <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}