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
import ProtectedRoute from "./components/ProtectedRoute";

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
        element:<ProtectedRoute><Onboarding/></ProtectedRoute>
      },
      {
        path:"/jobs",
        element:<ProtectedRoute><JobListing/></ProtectedRoute>
      },
      {
        path:"/job/:id",
        element:<ProtectedRoute><Job/></ProtectedRoute>
      },
      {
        path:"/post-jobs",
        element:<ProtectedRoute><JobPosting/></ProtectedRoute>
      },
      {
        path:"/saved-jobs",
        element:<ProtectedRoute><SavedJobs/></ProtectedRoute>
      },
      {
        path:"/my-jobs",
        element:<ProtectedRoute><MyJobs/></ProtectedRoute>
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
