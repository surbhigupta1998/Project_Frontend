import React,{useState}from 'react'
import './post.css'
import { useDispatch, useSelector } from 'react-redux';
import {postFetch} from '../Action/post';
import { useNavigate } from 'react-router-dom';

function Post() {

    const user ={
        title : "",
        text : ""
    }
    const [post, setPost] = useState(user);
    
    const selector = useSelector(state => state.postReducer.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setPost((post) => ({
            ...post, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(post);
        await dispatch(postFetch(post )) 
        .then((res) => {   
            if(res.post) {
                navigate('/home')
            }   
           });    
    };

    return (
        <div className='container'>
            <div className='wrapper'>
                <form className='form-wrapper'>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={setPost.title}
                            onChange={handleChange}
                        />
                    </div><br></br>
                    <div className="writeFormGroup">
                        <textarea
                            placeholder="Tell your story..."
                            type="textarea"
                            name="text"
                            value={setPost.text}
                            onChange={handleChange}
                        ></textarea>
                    </div><br></br>

                    <div>
                        <button className='btn' onClick={handleSubmit}>Post</button>


                    </div>
                </form>
            </div>
        </div>
    );
}
export default Post;