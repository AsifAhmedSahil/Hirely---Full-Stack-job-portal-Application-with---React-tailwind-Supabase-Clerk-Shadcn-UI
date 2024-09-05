import { Link, useSearchParams } from "react-router-dom";
// import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [showSignIn,setShowSignIn] = useState(false)

  const [search, setSearch] = useSearchParams();
  // const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) =>{
    if(e.target === e.currentTarget){
      setShowSignIn(false)
      setSearch({})
    }
  }

  return (
    <div>
      <nav className="flex justify-between items-center p-4">
        <Link>
          {/* <img src="/logo.png" alt="logo" /> */}
         <i> <h2 className="text-4xl font-bold text-blue-500">Hirely</h2></i>
        </Link>

        {/* <Button variant="outline">Login</Button> */}
       <div className="flex gap-8">
       <SignedOut>
        <Button variant="outline" onClick={()=>setShowSignIn(true)}>Login</Button>
        </SignedOut>
        <SignedIn>
        <Button variant="destructive" >
          <PenBox size={20} className="mr-2"/>
          Post a job</Button>
          <UserButton 
          appearance={{
            elements:{
              avatarBox: 'w-10 h-10'
            }
          }}
          >
            <UserButton.MenuItems>
              <UserButton.Link label="My Jobs" labelIcon={<BriefcaseBusiness size={15}/>} href="/my-jobs"/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Link label="Saved Jobs" labelIcon={<Heart size={15}/>} href="/saved-jobs"/>
            </UserButton.MenuItems>

          </UserButton>
        </SignedIn>
       </div>
      </nav>

      {
        showSignIn && (<div className="fixed  inset-0 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
            <SignIn 
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
            >

            </SignIn>
        </div>)
      }
    </div>
  );
};

export default Navbar;
