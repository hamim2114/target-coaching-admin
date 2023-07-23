import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EventInput.scss';
import { MdFileUpload } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../utils/axiosReq';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uploadImage } from '../../utils/upload';
import { useEffect } from 'react';

const EventInput = () => {
  const [desc, setDesc] = useState('');
  const [input, setInput] = useState({});
  const [img, setImg] = useState('');
  const [file, setFile] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errmsg, setErrmsg] = useState('')

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input) => axiosReq.post('/event', input),
    onSuccess: () => {
      queryClient.invalidateQueries(['event']);
      setCreateSuccess(true);
      toast.success('Event Created Successfully!');
    },
    onError: (err) => setErrmsg(err.response.data)
  });

  const handlePost = async (e) => {
    e.preventDefault();
    if (input && desc) {
      setLoading(true)
      if (file) {
        const {public_id, secure_url} = await uploadImage(file);
        mutation.mutate({imgId: public_id, img: secure_url, ...input,  body: desc });
      } else {
        mutation.mutate({ ...input, body: desc });
      }
      setLoading(false)
    };
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (createSuccess) {
      navigate('/event');
    }
  }, [createSuccess])

  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImg(URL.createObjectURL(file));
  };

  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
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
    <div className="event-input">
      <form className="wrapper" onSubmit={handlePost}>
        <div className="upload-img">
          <label htmlFor="file"><MdFileUpload /></label>
          {img && <img src={img} alt="Upload Image" />}
        </div>
        <input type="file" className="file" hidden name="" id="file" onChange={handleImgChange} />
        <input name='title' required type="text" placeholder="Event Title*" onChange={handleInput} />
        <input name='date' required  type="text" placeholder="Event Date e.g. 13th Dec 2023*" onChange={handleInput} />
        <input name='time' required type="text" placeholder="Event Time e.g. 09.00 AM*" onChange={handleInput} />
        <input name='location' required type="text" placeholder="Event Location* e.g. Coaching Campus" onChange={handleInput} />
        <div className="editor">
          <ReactQuill modules={toolbarOptions} theme="snow" placeholder="Event Descriptions" value={desc} onChange={setDesc} required={true} />
        </div>
        <button disabled={loading} type='submit' className="event-btn">
          {loading ? 'Loading...' : 'POST'}
        </button>
        <p style={{color: 'red'}}>{errmsg}</p>
      </form>
    </div>
  );
};

export default EventInput;
