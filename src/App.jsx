import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import LandingPage from "./Pages/LandingPage";
import Onboarding from "./Pages/Onboarding";
import JobListing from "./Pages/JobListing";
import Job from "./Pages/Job";
import JobPosting from "./Pages/JobPosting";
import SavedJobs from "./Pages/SavedJobs";
import MyJobs from "./Pages/MyJobs";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/onboarding",
        element:<Onboarding/>
      },
      {
        path:"/jobs",
        element:<JobListing/>
      },
      {
        path:"/job/:id",
        element:<Job/>
      },
      {
        path:"/post-jobs",
        element:<JobPosting/>
      },
      {
        path:"/saved-jobs",
        element:<SavedJobs/>
      },
      {
        path:"/my-jobs",
        element:<MyJobs/>
      },
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
