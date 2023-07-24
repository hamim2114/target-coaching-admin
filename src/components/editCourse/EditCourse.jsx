import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditCourse.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCourse = () => {
  const [input, setInput] = useState({});
  const [desc, setDesc] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [err, setErr] = useState('')

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['single-course'],
    queryFn: () => axiosReq.get(`/course/${id}`).then(res => res.data)
  });

  useEffect(() => {
    if (data) {
      setInput(data);
      setDesc(data.desc)
    }
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedCourse) => axiosReq.put(`/course/${id}`, updatedCourse),
    onSuccess: () => {
      queryClient.invalidateQueries(['single-course']);
      setUpdateSuccess(true);
      toast.success('Course Updated Successfully!');
    },
    onError: (err) => setErr(err.response.data)
  })
  const navigate = useNavigate();
  useEffect(() => {
    if (updateSuccess) {
      navigate('/course');
    }
  }, [updateSuccess]);
  const updateHandler = () => {
    mutation.mutate({ ...input, desc });
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
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
      ['link', 'image', 'video'],
      ['clean'], // Remove formatting option
    ],
  };


  return (
    <div className="edit-course">
      {isLoading ? 'Loading..' : error ? 'Something went wrong!' :
        !data ? <h2 style={{ padding: '5rem', color: 'gray' }}>Course Not Found!</h2> :
          <div className="wrapper">
            <input type="text" name='class' placeholder='Class' onChange={handleInput} value={input?.class} />
            <input type="text" name='date' placeholder='Date' onChange={handleInput} value={input?.date} />
            <input type="text" name='time' placeholder='Time' onChange={handleInput} value={input?.time} />
            <div className="editor">
              {desc && <ReactQuill modules={toolbarOptions} theme="snow" placeholder='Descriptions' value={desc} onChange={setDesc} />}
            </div>
            <button className='course-btn' onClick={updateHandler}>UPDATE</button>
            {err && <p style={{ color: 'red' }}>{err}</p>}
          </div>
      }
    </div>
  )
}

export default EditCourse;