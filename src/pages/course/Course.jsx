import { AiFillDelete } from 'react-icons/ai'
import './Course.scss';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosReq } from '../../utils/axiosReq';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useState } from 'react';
import { deleteImage } from '../../utils/upload';

const Course = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['course'],
    queryFn: () => axiosReq.get('/course').then(res => res.data)
  });

  Modal.setAppElement('#root')
  const queryClient = useQueryClient();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [imgId, setImgId] = useState(null);

  const mutation = useMutation({
    mutationFn: (id) => axiosReq.delete(`/course/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['course']);
      toast.success('Course Deleted Successfully!')
    }
  });

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


  const openDeleteModal = (id, imgId) => {
    setDeleteCourseId(id);
    setImgId(imgId)
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    closeDeleteModal();
    mutation.mutate(deleteCourseId);
    if(imgId) await deleteImage(imgId);
  };

  return (
    <div className="blogs-section">
      <Link to='/course/create' className="creat">Create New Course</Link>
      {
        isLoading ? 'Loading..' : error ? 'Something went wrong!' :
        data.length === 0 ? <h2 style={{ padding: '5rem', color: 'gray' }}>Course Empty.</h2> :
          data.map((d, i) => (
            <div key={i} className="course">
              <div className="img-title">
                <img src={d.img || '/defaultBlog.jpg'} alt="" />
                <h4>{d.class}</h4>
                <span><b>{d.category}</b></span>
                <span>{d?.date}</span>
                <span>{d.time}</span>
                <span>Added: {new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="btn">
                <Link to={`/course/${d._id}`} className="edit">EDIT</Link>
                <button className="delete" onClick={() => openDeleteModal(d._id, d?.imgId)}><AiFillDelete size={24} /></button>
              </div>
            </div>
          ))
      }
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        style={customStyles}
      >
        <h2 className='modal-h2'>Delete Confirmation</h2>
        <p className='modal-p'>Are you sure you want to Delete this Course?</p>
        <div>
          <button className='modal-cancel' onClick={closeDeleteModal}>Cancel</button>
          <button className='modal-delete' onClick={confirmDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}

export default Course