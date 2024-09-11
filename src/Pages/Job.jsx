import { getSingleJob, updateHiringStatus } from "@/api/apiJobs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react"
import MarkdownEditor from "@uiw/react-markdown-editor"
import { Briefcase, DoorClosed, DoorOpen,  MapPinIcon } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { BarLoader } from "react-spinners"


const Job = () => {
  const {user,isLoaded} = useUser()
  const {id} = useParams()

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );


  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJobs());
  };
  

  console.log(jobs)

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex justify-between items-center flex-col-reverse md:flex-row">
        <h1 className="gradient-title font-extrabold text-5xl lg:text-6xl">{jobs?.title}</h1>
        <img src={jobs?.company?.logo_url} className="h-12" alt="logo" />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon/>
          {jobs?.location}
        </div>

        <div className="flex gap-2">
          <Briefcase/>
          {jobs?.applications.length} Applicants
        </div>

        <div className="flex gap-2">
          {
            jobs?.isOpen ? (
              <>
                  <DoorOpen/> Open
              </>
            ) :(
              <>
              <DoorClosed/> Closed
          </>
            )
          }
        </div>

      </div>

      {/* hiring status */}

      {loadingHiringStatus && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
      {jobs?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${jobs?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (jobs?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}



      <h1 className="text-2xl lg:text-3xl font-bold">About the jobs</h1>
      <p className="sm:text-lg ">{jobs?.description}</p>
      <h1 className="text-2xl lg:text-3xl font-bold">What we are looking for</h1>
      <MarkdownEditor.Markdown source={jobs?.requirements} className="bg-transparent sm:text-lg"/>
    </div>
  )
}

export default Job