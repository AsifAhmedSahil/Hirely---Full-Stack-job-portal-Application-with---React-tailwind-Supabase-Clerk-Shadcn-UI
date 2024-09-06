import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {BarLoader} from 'react-spinners'


const Onboarding = () => {
  const {user,isLoaded} = useUser()
  const navigate = useNavigate()

  const handleRoleSelection = async(role) =>{
    await user.update({
      unsafeMetadata: {role}
    })
    .then(() =>{
      navigate(role === "recruiter"? "/post-jobs":"/jobs")
    })
  }

  useEffect(()=>{
    if(user?.unsafeMetadata?.role){
      navigate(user?.unsafeMetadata?.role === "recruiter"? "/post-jobs":"/jobs")
    }
  },[user])

  if(!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
  }
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <h1 className="gradient-title text-7xl lg:text-8xl font-extrabold">I am a...</h1>
      <div className="mt-16 w-full grid grid-cols-2 md:px-20 gap-4">
        <Button variant="blue" className="h-36 text-2xl" onClick ={() =>handleRoleSelection("candidate")}>Candidate</Button>
        <Button variant="destructive" className="h-36 text-2xl" onClick ={() =>handleRoleSelection("recruiter")}>Recruiter</Button>

      </div>
    </div>
  )
}

export default Onboarding