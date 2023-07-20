import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaRegNewspaper } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { RiTeamFill, RiGalleryFill } from 'react-icons/ri';
import './Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setNavStatus } from '../../redux/navslice';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { navStatus: nav } = useSelector(state => state.nav);
  const dispatch = useDispatch();

  return (
    <div className='sidebar'>
      <div className="list">
        <Link to='/' className={`list-item ${pathname === '/' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><HomeOutlinedIcon /> Dashboard</Link>
        <Link to='/team' className={`list-item ${pathname === '/team' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><Person2OutlinedIcon /> Teacher</Link>
        <Link to='/' className={`list-item ${pathname === '/job' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><FaceOutlinedIcon /> Student</Link>
        <Link to='/course' className={`list-item ${pathname === '/course' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><TypeSpecimenOutlinedIcon /> Course</Link>
        <Link to='/' className={`list-item ${pathname === '/notice' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><AnnouncementOutlinedIcon /> Notice</Link>
        <Link to='/' className={`list-item ${pathname === '/job' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><EventNoteOutlinedIcon /> Event</Link>
        <Link to='/blog' className={`list-item ${pathname === '/blog' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><ArticleOutlinedIcon /> Blog</Link>
        <Link to='/' className={`list-item ${pathname === '/gallery' ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}><ImageOutlinedIcon /> Gallery</Link>
      </div>
    </div>
  )
}

export default Sidebar