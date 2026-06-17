import React, { useEffect, useState } from 'react';
import { 
  TextField, 
  InputGroup, 
  Label, 
  Select, 
  ListBox 
} from "@heroui/react";

// Optional: Lucide icons play beautifully with dark UIs
import { Search, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JobFilters({ onFilterChange }) {
  // State management for filters
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");

const router = useRouter();


  useEffect(() => {
    const sp = new URLSearchParams();
    if(search){
      sp.set("search", search);
    }
    if(jobType !== "all"){
      sp.set("jobType", jobType);
    }
    if(category !== "all"){
      sp.set("category", category);
    }
    if(salaryRange !== "all"){
      sp.set("salaryRange", salaryRange);
    }

    console.log("search Params", sp.toString());
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, jobType, category, salaryRange, search]);

  // Handler to bubble up state changes to the parent page component
  const handleFilterUpdate = (updatedFilters) => {
    if (onFilterChange) {
      onFilterChange({
        search,
        jobType,
        category,
        salaryRange,
        ...updatedFilters
      });
    }
  };

  return (
    <div className="w-full bg-[#121212] p-6 rounded-xl border border-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 1. Search input for Title & Company */}
      <div className="w-full ">
        <TextField>
          <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">Search Jobs</Label>
          <InputGroup className="bg-zinc-900 border border-zinc-800 rounded-lg text-white focus-within:border-zinc-700 transition">
            <InputGroup.Prefix className="pl-3 text-zinc-500">
              <Search size={18} />
            </InputGroup.Prefix>
            <InputGroup.Input 
              placeholder="Search by title or company..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleFilterUpdate({ search: e.target.value });
              }}
              className="bg-transparent text-white px-3 py-2.5 outline-none w-full placeholder-zinc-600"
            />
          </InputGroup>
        </TextField>
      </div>

      {/* 2. Filter by Job Type (Remote, Full-time, etc.) */}
      <div className="w-full ">
        <Select 
          value={jobType} 
          onChange={(value) => {
            setJobType(value);
            handleFilterUpdate({ jobType: value });
          }}
        >
          <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">Job Type</Label>
          <Select.Trigger className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-3 py-2.5 flex justify-between items-center hover:border-zinc-700 transition">
            <Select.Value placeholder="All Types" />
            <Select.Indicator className="text-zinc-500" />
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl mt-1 overflow-hidden">
            <ListBox className="text-zinc-300 p-1">
              <ListBox.Item id="all" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>All Types</Label>
              </ListBox.Item>
              <ListBox.Item id="Remote" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Remote</Label>
              </ListBox.Item>
              <ListBox.Item id="Full-time" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Full-time</Label>
              </ListBox.Item>
              <ListBox.Item id="Part-time" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Part-time</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 3. Filter by Category */}
      <div className="w-full ">
        <Select 
          value={category} 
          onChange={(value) => {
            setCategory(value);
            handleFilterUpdate({ category: value });
          }}
        >
          <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">Category</Label>
          <Select.Trigger className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-3 py-2.5 flex justify-between items-center hover:border-zinc-700 transition">
            <Select.Value placeholder="All Categories" />
            <Select.Indicator className="text-zinc-500" />
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl mt-1 overflow-hidden">
            <ListBox className="text-zinc-300 p-1">
              <ListBox.Item id="all" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>All Categories</Label>
              </ListBox.Item>
              <ListBox.Item id="product" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Product Management</Label>
              </ListBox.Item>
              <ListBox.Item id="engineering" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Engineering</Label>
              </ListBox.Item>
              <ListBox.Item id="marketing" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Marketing</Label>
              </ListBox.Item>
              <ListBox.Item id="design" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Design</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 4. Filter by Salary Range */}
      <div className="w-full ">
        <Select 
          value={salaryRange} 
          onChange={(value) => {
            setSalaryRange(value);
            handleFilterUpdate({ salaryRange: value });
          }}
        >
          <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">Salary Range</Label>
          <Select.Trigger className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-3 py-2.5 flex justify-between items-center hover:border-zinc-700 transition">
            <Select.Value placeholder="Any Salary" />
            <Select.Indicator className="text-zinc-500" />
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl mt-1 overflow-hidden">
            <ListBox className="text-zinc-300 p-1">
              <ListBox.Item id="all" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Any Salary</Label>
              </ListBox.Item>
              <ListBox.Item id="0-100k" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>Under 100k BDT</Label>
              </ListBox.Item>
              <ListBox.Item id="100k-150k" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>100k – 150k BDT</Label>
              </ListBox.Item>
              <ListBox.Item id="150k+" className="p-2 hover:bg-zinc-800 rounded cursor-pointer transition">
                <Label>150k+ BDT</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

    </div>
  );
}