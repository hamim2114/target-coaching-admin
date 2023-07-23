import { AiFillDelete } from 'react-icons/ai'
import './Notice.scss';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosReq } from '../../utils/axiosReq';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useState } from 'react';
import { deleteImage } from '../../utils/upload';

const Notice = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['notice'],
    queryFn: () => axiosReq.get('/notice').then(res => res.data)
  });

  Modal.setAppElement('#root')
  const queryClient = useQueryClient();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteNoticeId, setDeleteNoticeId] = useState(null);
  const [imgId, setImgId] = useState(null);

  const mutation = useMutation({
    mutationFn: (id) => axiosReq.delete(`/notice/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['notice']);
      toast.success('Notice Deleted Successfully!')
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
    setDeleteNoticeId(id);
    setImgId(imgId)
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    closeDeleteModal();
    mutation.mutate(deleteNoticeId);
    if(imgId) await deleteImage(imgId);
  };

  return (
    <div className="notice-section">
      <Link to='/notice/create' className="creat">Create New Notice</Link>
      {
        isLoading ? 'Loading..' : error ? 'Something went wrong!' :
        data.length === 0 ? <h2 style={{ padding: '5rem', color: 'gray' }}>Notice Empty.</h2> :
          data.map((d, i) => (
            <div key={i} className="notice">
              <div className="img-title">
                <img src={d.img || '/defaultBlog.jpg'} alt="" />
                <h4>{d.title.substring(0, 50)}</h4>
                <span>{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="btn">
                <Link to={`/notice/${d._id}`} className="edit">EDIT</Link>
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
        <p className='modal-p'>Are you sure you want to Delete this Notice?</p>
        <div>
          <button className='modal-cancel' onClick={closeDeleteModal}>Cancel</button>
          <button className='modal-delete' onClick={confirmDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}

export default Notice