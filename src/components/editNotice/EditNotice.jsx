import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditNotice.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditNotice = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errorMsg, setError] = useState('')

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['single-notice'],
    queryFn: () => axiosReq.get(`/notice/${id}`).then(res => res.data)
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setValue(data.body);
    }
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedNotice) => axiosReq.put(`/notice/${id}`, updatedNotice),
    onSuccess: () => {
      queryClient.invalidateQueries(['single-notice']);
      setUpdateSuccess(true);
      toast.success('Notice Updated Successfully!');
    },
    onError: (err) => setError(err.response.data)
  })
  const navigate = useNavigate();
  if(updateSuccess){
      navigate('/notice')
  }
  const updateHandler = () => {
    mutation.mutate({ title, body: value });
  }

  const toolbarOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // Indentation options
      [{ align: [] }], 
      [{ color: [] }, { background: [] }],
      ['link', 'image','video'],
      ['clean'], // Remove formatting option
    ],
  };

  return (
    <div className="editBlog">
      {isLoading ? 'Loading..' :
      !data ? <h2 style={{ padding: '5rem', color: 'gray' }}>Notice Not Found!</h2> :
        <div className="wrapper">
          <input type="text" value={title} placeholder='Notice Title' onChange={(e) => setTitle(e.target.value)} />
          <div className="editor">
            <ReactQuill theme="snow" modules={toolbarOptions} placeholder='Blog Descriptions' value={value} onChange={setValue} />
          </div>
          <button disabled={mutation.isLoading} className='blog-btn' onClick={updateHandler}>{mutation.isLoading? 'Loading...' : 'UPDATE'}</button>
          {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
        </div>
      }
    </div>
  )
}

export default EditNotice;