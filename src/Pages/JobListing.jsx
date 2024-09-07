import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  //* search parameter state
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    searchQuery,
    location,
    company_id,
  });

  console.log(Jobs);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, searchQuery, location, company_id]);

  if(!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
  }

  return (
    <div>
      <h1 className="gradient-title text-6xl lg:text-7xl text-center pb-8 font-extrabold">Latest Jobs</h1>

      {/* add filters */}

      {
        loadingJobs && (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
        )
      }

      {
        loadingJobs === false && (
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              Jobs?.length ? (
                Jobs.map((job) =>{
                  return <JobCard key={job.id} job={job}/>
                })
              ) : (
                <div>No Jobs Found!</div>
              )
            }
          </div>
        )
      }
    </div>
  )
};

export default JobListing;
