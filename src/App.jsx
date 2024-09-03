import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import LandingPage from "./Pages/LandingPage";

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
