import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const MainLayout = () => {
  return (
    <div>
        <div className="grid-background"></div>
        <main className=" min-h-screen container mx-auto">
        <Navbar/>
        <Outlet/>
        <Footer/>
        </main>
    </div>
  )
}

export default MainLayout