import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-4">
        <Link>
          {/* <img src="/logo.png" alt="logo" /> */}
         <i> <h2 className="text-4xl font-bold text-blue-500">Hirely</h2></i>
        </Link>

        {/* <Button variant="outline">Login</Button> */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  );
};

export default Navbar;
