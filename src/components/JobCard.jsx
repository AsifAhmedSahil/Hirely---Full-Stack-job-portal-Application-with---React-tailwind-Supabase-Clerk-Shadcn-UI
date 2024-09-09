/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { savedJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const {
    fn: fnSavedJobs,
    data: savedJobsData,
    loading: loadingSavedJobs,
  } = useFetch(savedJobs, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    // Ensure savedJobsData is not null or undefined
    if (savedJobsData && Array.isArray(savedJobsData)) {
      setSaved(savedJobsData.length > 0);
    } else {
      setSaved(false); // Or some default value if you want
    }
  }, [savedJobsData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold mb-4">
          {job.title}

          {isMyJob && (
            <Trash2Icon
              size={18}
              fill="red"
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link className="flex-1" to={`/job/${job.id}`}>
          <Button className="w-full" variant="secondary">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart fill="red" size={15} stroke="red" />
            ) : (
              <Heart size={15} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
