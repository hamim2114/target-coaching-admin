import { Outlet } from "react-router-dom"
import Topbar from "../topbar/Topbar";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import './Layout.scss'


const Layout = () => {
  const { navStatus } = useSelector(state => state.nav);
  const { admin } = useSelector(state => state.admin);
  return (
    <div className='layout'>
        <div className="layout-topbar"><Topbar /></div>
        <div className="layout-home">
          <div className={`layout-home-sidebar ${navStatus ? 'active' : ''}`}><Sidebar /></div>
          <div className="layout-home-outlet"><Outlet /></div>
       </div>
    </div>
  )};

  export default Layout