import { useEffect, useState } from 'react';
import './Dashboard.scss';
import { axiosReq } from '../../utils/axiosReq';

const Dashboard = () => {
  const [course, setCourse] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      try {
        axiosReq.get('/course').then(res => setCourse(res.data));
        // axiosReq.get('/blog').then(res => setBlogs(res.data));
        axiosReq.get('/team').then(res => setTeams(res.data));
      } catch (error) {
        console.log(error)
      }
    }
    getAll();
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <div className="total"><h4> Total Students:</h4>0</div>
        <div className="total"><h4> Total Teachers:</h4>{teams.length}</div>
        <div className="total"><h4> Total Course:</h4>{course.length}</div>
        <div className="total"><h4> Active Notice:</h4>0</div>
        <div className="total"><h4>Events:</h4>0</div>
        <div className="total"><h4>Total Blog:</h4>0</div>
      </div>
    </div>
  )
}

export default Dashboard