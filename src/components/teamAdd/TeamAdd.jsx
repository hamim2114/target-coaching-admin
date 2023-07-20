import { useEffect, useState } from 'react'
import './TeamAdd.scss'
import { MdFileUpload } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import { toast } from 'react-toastify';
import { uploadImage } from '../../utils/upload';
import { useNavigate } from 'react-router-dom';

const TeamAdd = () => {
  const [img, setImg] = useState('');
  const [errmsg, setErrmsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input) => axiosReq.post('/team', input),
    onSuccess: () => {
      queryClient.invalidateQueries(['team']);
      toast.success('Added Successfully!');
      setSuccess(true);
    },
    onError: (err) => setErrmsg(err.response.data)
  });

  const navigate = useNavigate()

  useEffect(() => {
    if(success) navigate('/team')
  },[success])

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImg(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setInput({...input,[e.target.name] : e.target.value})
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(file) {
      const {public_id, secure_url} = await uploadImage(file);
      mutation.mutate({img: secure_url, imgId: public_id, ...input})
    } else {
      mutation.mutate({...input})
    }
    setLoading(false)
  }
  return (
    <div className="team-add">
      <form className='team-form' onSubmit={handleUpload}>
        <div className="upload-img">
          <label htmlFor="file"><MdFileUpload /></label>
          <img src={img || '/noavatar.png'} alt="image" />
        </div>
        <input type="file" className='file' hidden name="" id="file" onChange={handleImgChange} />
        <input onChange={handleChange} required name='name' type="text" placeholder='Name' />
        <input onChange={handleChange} required name='title' type="text" placeholder='Title' />
        <input onChange={handleChange} name='phone' type="text" placeholder='Phone "optional"' />
        <input onChange={handleChange} name='email' type="text" placeholder='Email "optional"' />
        <input onChange={handleChange} name='facebook' type="text" placeholder='Facebook Profile Link "optional"' />
        <button type='submit'>{loading ? 'Loading..' : 'ADD'}</button>
        <p style={{color: 'red'}}>{errmsg}</p>
      </form>
    </div>
  )
}

export default TeamAdd