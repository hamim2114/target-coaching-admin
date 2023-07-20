import { Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
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
          <Route path='/' element={<Verify><Layout /></Verify> }>
            <Route index element={<Dashboard />} />
            <Route path='team' element={<Team />} />
            <Route path='team/add' element={<TeamAdd />} />
            <Route path='course' element={<Course />} />
            <Route path='course/create' element={<CourseInput />} />
            <Route path='course/:id' element={<EditCourse />} />
            <Route path='blog' element={<Blog />} />
            <Route path='blog/create' element={<BlogInput />} />
            <Route path='blog/:blogId' element={<EditBlog />} />
          </Route>
          <Route path='/login' element={admin ? <Navigate to='/' /> : <Login />} />
        </Routes>
    </>
  )
};

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <Dashboard />
//       },
//       {
//         path: 'blog',
//         element: <Blog />
//       },
//       {
//         path: 'blog/create',
//         element: <BlogInput />
//       },
//       {
//         path: 'blog/:blogId',
//         element: <EditBlog />
//       },
//       {
//         path: 'job',
//         element: <Job />
//       },
//       {
//         path: 'job/create',
//         element: <JobInput />
//       },
//       {
//         path: 'job/:jobId',
//         element: <EditJob />
//       },
//       {
//         path: 'team',
//         element: <Team />
//       },
//       {
//         path: 'team/add',
//         element: <TeamAdd />
//       },
//       {
//         path: 'gallery',
//         element: <Gallery />
//       },
//     ],
//   },
//   {
//     path: '/login',
//     element: admin ? <Navigate to={'/'} /> : <Login />
//   }
// ]);

//   return <RouterProvider router={router} />;
// }

export default App;
