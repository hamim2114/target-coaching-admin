import { useEffect, useState } from 'react';
import './Dashboard.scss';
import { axiosReq } from '../../utils/axiosReq';

const Dashboard = () => {
  const [course, setCourse] = useState([]);
  const [teams, setTeams] = useState([]);
  const [notice, setNotice] = useState([]);
  const [event, setEvent] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        axiosReq.get('/team').then(res => setTeams(res.data));
        axiosReq.get('/course').then(res => setCourse(res.data));
        axiosReq.get('/notice').then(res => setNotice(res.data));
        axiosReq.get('/event').then(res => setEvent(res.data));
        axiosReq.get('/blog').then(res => setBlogs(res.data));
      } catch (error) {
        console.log(error)
      }
    }
    getAll();
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <div className="total"><h4>Students:</h4>0</div>
        <div className="total"><h4>Teachers:</h4>{teams.length}</div>
        <div className="total"><h4>Course:</h4>{course.length}</div>
        <div className="total"><h4>ANotice:</h4>{notice.length}</div>
        <div className="total"><h4>Events:</h4>{event.length}</div>
        <div className="total"><h4>Blog:</h4>{blogs.length}</div>
      </div>
    </div>
  )
}

export default Dashboard