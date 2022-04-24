import React, { useEffect, useState } from 'react'
import './Post.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// by developer
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from 'react-toastify';

export default function Post() {

    const { authtoken } = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!authtoken){
          toast.info("You are not logged in")
          navigate('/login')
        }
    },[])

    const [post, setPost] = useState({
        title: "",
        text: "",
        visibility:false,
        authtoken:authtoken
    });

    const handleChange = (e) => {
        setPost({...post,[e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setPost({...post,text:post.text.slice(3,post.text.length-4)})
        console.warn(post)
        axios.post('http://localhost:7000/posts/create', post).then(response=>{
            if(response.status === 201){
                toast.success("Blog Successfully Posted")
                if(post.visibility)
                    navigate("/home")
                else
                    navigate("/draft")
            }else{
                toast.info("Opps!! Something went wrong")
            }
        }).catch(error=>{
            toast.error(error.response.data.msg)
        })
    };

    const handleVisibility = () =>{
        setPost({...post,visibility:!post.visibility})
    }   

    return (
        <div className='post-container-wrapper'>
            <div>  </div>
            <div className='post-app-wrapper'>
                <form className='post-form-wrapper-2'>
                    <div>
                        <input
                            className='input_values'
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                        />
                    </div><br></br>
                    <CKEditor
                        name="text"
                        editor={ClassicEditor}
                        data={post.text}
                        onChange={(e, editor) => { setPost({ ...post, text: editor.getData() }) }}
                    />
                    <span className='mx-2' style={{fontSize:"20px"}}>Private</span>
                    <label className="switch my-3">
                        <input type="checkbox"
                        value={true}
                        onChange={handleVisibility} />
                        <span className="slider round"></span>
                    </label>
                    <span className='mx-2' style={{fontSize:"20px"}}>Public</span>
                    <div>
                        <button className='btn btn-outline-primary' type='submit' onClick={handleSubmit}>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}