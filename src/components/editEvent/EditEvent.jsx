import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditEvent.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditEvent = () => {
  const [input, setInput] = useState({});
  const [body, setBody] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [err, setErr] = useState('')

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['single-event'],
    queryFn: () => axiosReq.get(`/event/${id}`).then(res => res.data)
  });

  useEffect(() => {
    if (data) {
      setInput(data);
      setBody(data.body)
    }
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedEvent) => axiosReq.put(`/event/${id}`, updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries(['single-event']);
      setUpdateSuccess(true);
      toast.success('Event Updated Successfully!');
    },
    onError: (err) => setErr(err.response.data)
  })
  const navigate = useNavigate();
  useEffect(() => {
    if (updateSuccess) {
      navigate('/event');
    }
  }, [updateSuccess]);

  const updateHandler = () => {
    mutation.mutate({ ...input, body });
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
    <div className="edit-event">
      {isLoading ? 'Loading..' : error ? 'Something went wrong!' :
        !data ? <h2 style={{ padding: '5rem', color: 'gray' }}>Course Not Found!</h2> :
          <div className="wrapper">
            {input.class && <input type="text" name='title' placeholder='Class' onChange={handleInput} value={input.title} />}
            {input.date && <input type="text" name='date' placeholder='Date' onChange={handleInput} value={input.date} />}
            {input.time && <input type="text" name='time' placeholder='Time' onChange={handleInput} value={input.time} />}
            {input.time && <input type="text" name='location' placeholder='Location' onChange={handleInput} value={input.location} />}
            <div className="editor">
              {body && <ReactQuill modules={toolbarOptions} theme="snow" placeholder='Descriptions' value={body} onChange={setBody} />}
            </div>
            <button className='event-btn' onClick={updateHandler}>UPDATE</button>
            {err && <p style={{ color: 'red' }}>{err}</p>}
          </div>
      }
    </div>
  )
}

export default EditEvent;