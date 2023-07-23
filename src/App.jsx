import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/Dashboard';
import Blog from './pages/blog/Blog';
import Team from './pages/team/Team';
import Gallery from './pages/gallery/Gallery';
import { useSelector } from 'react-redux';
import BlogInput from './components/blogInput/BlogInput';
import EditCourse from './components/editCourse/EditCourse';
import EditBlog from './components/editBlog/EditBlog';
import TeamAdd from './components/teamAdd/TeamAdd';
import Login from './pages/login/Login';
import Layout from './components/layout/Layout';
import Course from './pages/course/Course';
import CourseInput from './components/courseInput/CourseInput';
import Notice from './pages/notice/Notice';
import NoticeInput from './components/noticeInput/NoticeInput';
import Event from './pages/event/Event';
import EditNotice from './components/editNotice/EditNotice';
import EventInput from './components/eventInput/EventInput';
import EditEvent from './components/editEvent/EditEvent';

function App() {
  const { admin } = useSelector(state => state.admin);

  const Verify = ({ children }) => {
    if (admin) {
      return children
    } else {
      return <Navigate to={'/login'} />
    }
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Verify><Layout /></Verify>}>
          <Route index element={<Dashboard />} />
          <Route path='notice' element={<Notice />} />
          <Route path='notice/create' element={<NoticeInput />} />
          <Route path='notice/:id' element={<EditNotice />} />
          <Route path='team' element={<Team />} />
          <Route path='team/add' element={<TeamAdd />} />
          <Route path='course' element={<Course />} />
          <Route path='course/create' element={<CourseInput />} />
          <Route path='course/:id' element={<EditCourse />} />
          <Route path='event' element={<Event />} />
          <Route path='event/create' element={<EventInput />} />
          <Route path='event/:id' element={<EditEvent />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog/create' element={<BlogInput />} />
          <Route path='blog/:blogId' element={<EditBlog />} />
          <Route path='gallery' element={<Gallery />} />
        </Route>
        <Route path='/login' element={admin ? <Navigate to='/' /> : <Login />} />
      </Routes>
    </>
  )
};

export default App;
