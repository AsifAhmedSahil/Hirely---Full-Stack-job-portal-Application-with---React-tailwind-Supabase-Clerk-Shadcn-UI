import { getJobs } from "@/api/apiJobs"
import { useSession } from "@clerk/clerk-react"
import { useEffect } from "react"


const JobListing = () => {
  const {session} = useSession()
  console.log(session)

  const fetchJobs = async() =>{
    const superbaseToken = await session.getToken({
      template:"supabase"
    })
    const data = await getJobs(superbaseToken)
    console.log(data)
  }

  useEffect(()=>{
    fetchJobs()
  },[])

  return (
    <div>JobListing</div>
  )
}

export default JobListing