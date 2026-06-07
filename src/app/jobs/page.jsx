import JobCard from "@/components/jobs/JobsCard";
import { getJobs } from "@/lib/api/jobs";


export default async function page() {
    const jobs = await getJobs();
    console.log(jobs);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-black p-8">
        {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
        ))}
    </div>
  );
}