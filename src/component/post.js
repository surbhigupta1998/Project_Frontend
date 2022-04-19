import React, { useEffect, useState } from 'react'
import './post.css'
import { useDispatch, useSelector } from 'react-redux';
import { postFetchUser, saveToDraft } from '../Action/post';
import { useNavigate } from 'react-router-dom';
// by developer
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//end
function Post() {

    const user = {
        title: "",
        text: ""
    }
    const [post, setPost] = useState(user);

    const selector = useSelector(state => state.postReducer.users)
    const draftPostValue = useSelector(state => state.postReducer.draftPost)
    console.log("20", draftPostValue)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setPost((post) => ({
            ...post, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(post);
        await dispatch(postFetchUser({ ...post, status: "success" }))
            .then((res) => {
                if (res) {
                    navigate('/home')
                }
            });
    };
    const handleDraft = async (e) => {
        e.preventDefault();
        await dispatch(postFetchUser({ ...post, status: "draft" }))
            .then((res) => {
                if (res) {
                    navigate('/home')
                }
            });
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
                            defaultValue={post.title}
                            onChange={handleChange}
                        />
                    </div><br></br>
                    <CKEditor
                        name="text"
                        editor={ClassicEditor}
                        data={post.text}
                        onChange={(e, editor) => { setPost({ ...post, text: editor.getData() }) }}

                    />
                    <div>
                        <button className='btn' onClick={handleSubmit}>Publish</button>
                        <button className='btn' onClick={handleDraft}>Save as draft</button>

                    </div>
                </form>
            </div>
        </div>
    );
}
export default Post;
