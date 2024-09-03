import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div>
        <div className="grid-background"></div>
        <Outlet/>
    </div>
  )
}

export default MainLayout