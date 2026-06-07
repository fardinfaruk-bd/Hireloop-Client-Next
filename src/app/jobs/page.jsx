import FilteredJobsContainer from "@/components/jobs/FilteredJobsContainer";
import { getJobs } from "@/lib/api/jobs";

export default async function page() {
  // Fetch data on the server
  const jobs = await getJobs();

  return (
    <div className="bg-black min-h-screen">
      {/* Header section remains statically rendered on the server */}
      <div className="p-8 text-center">
        <h1 className="font-bold text-4xl mb-2 text-white">Explore Open Roles</h1>
        <p className="text-zinc-400">Discover your next career move with top global tech companies.</p>
      </div>

      {/* Pass data to the Client Component for interactive filtering */}
      <div className="px-8 pb-12">
        <FilteredJobsContainer initialJobs={jobs} />
      </div>
    </div>
  );
}