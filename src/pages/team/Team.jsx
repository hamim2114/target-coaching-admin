import { AiFillDelete } from 'react-icons/ai'
import './Team.scss';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import Modal from 'react-modal';
import { useState } from 'react';
import { deleteImage } from '../../utils/upload';
import { toast } from 'react-toastify';


const Team = () => {
  const { isLoading, error, data: team } = useQuery({
    queryKey: ['team'],
    queryFn: () => axiosReq.get('/team').then(res => res.data)
  });

  Modal.setAppElement('#root');
  const queryClient = useQueryClient();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTeamId, setDeleteTeamId] = useState(null);
  const [imgId, setImgId] = useState(null);

  const mutation = useMutation({
    mutationFn: (id) => axiosReq.delete(`/team/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['team']);
      toast.success('Removed!')
    }
  });

  const openDeleteModal = (id, imgId) => {
    setDeleteTeamId(id);
    setImgId(imgId)
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    closeDeleteModal();
    mutation.mutate(deleteTeamId);
    if(imgId) await deleteImage(imgId);
  };

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

  return (
    <div className="team-section">
      <Link to='/team/add' className="creat">Add</Link>
      {
        isLoading ? 'Loading..' : error ? 'Something went wrong!' :
          team.length === 0 ? <h2 style={{ padding: '5rem', color: 'gray' }}>No Teachers Found.</h2> :
            team.map(t => (
              <div key={t._id} className="team">
                <div className="img-title">
                  <img src={t.img || '/noavatar.png'} alt="team" />
                  <h4>{t.name}</h4>
                  <span>{t.title}</span>
                  <span><b>Added:</b> {new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="btn">
                  <button onClick={() => openDeleteModal(t._id, t?.imgId)} className="delete"><AiFillDelete size={24} /></button>
                </div>
              </div>
            ))
      }
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Remove Confirmation"
        style={customStyles}
      >
        <h2 className='modal-h2'>Delete Confirmation</h2>
        <p className='modal-p'>Confirm?</p>
        <div>
          <button className='modal-cancel' onClick={closeDeleteModal}>Cancel</button>
          <button className='modal-delete' onClick={confirmDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}

export default Team