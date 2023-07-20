import { useEffect, useState } from 'react';
import './Topbar.scss';
import { FiLogOut } from 'react-icons/fi'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { setNavStatus } from '../../redux/navslice';
import { clearAdmin } from '../../redux/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import { toast } from 'react-toastify';

const Topbar = () => {
  const { navStatus: nav } = useSelector(state => state.nav);
  const [userSec, setUserSec] = useState(false);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => axiosReq.post('/auth/logout'),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['logout']);
      toast.success(res.data);
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosReq.get('/auth/verify');
      } catch (error) {
        if (error.response.status === 401) {
          return dispatch(clearAdmin());
        }
      }
    }
    checkAuth();
  }, [dispatch])

  const handleLogout = () => {
    dispatch(clearAdmin());
    mutation.mutate();
  };


  return (
    <div className="topbar">
      <div className="logo">Target Coaching</div>
      {/* <div className={`logout ${!nav? 'active' : ''}`}>
        <FiLogOut />
        <span onClick={handleLogout}>Logout</span>
      </div> */}
      <div className="user" onClick={() => setUserSec(p => !p)}>
        <div className="name">Mr Alex</div>
        <div className="img"><img src="/avatar.jpg" alt="" /></div>
      </div>
      <div className={`user-sec-main ${userSec && 'active'}`}>
        <div className="user-sec">
          <div className="user-name">Mr Alex</div>
          <div className="title">Admin</div>
          <span><FaUser /> Profile</span>
          <span><FaSignOutAlt /> Sign Out</span>
        </div>
      </div>
      <div className="nav-btn">
        <div className={`nav-btn-line ${nav ? 'active' : ''}`} onClick={() => dispatch(setNavStatus(!nav))}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Topbar