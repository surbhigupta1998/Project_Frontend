import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {postActionCreators} from '../Actions/index'
import { toast } from 'react-toastify';
import MainImage from '../main_image1.jpeg'
import { Link } from 'react-router-dom';
// import { FaEdit } from 'react-icons/fa'
export default function DraftPost() {
    
  const navigate = useNavigate()
  const { authtoken } = useSelector((state) => state.userReducer);
  const { privatePosts } = useSelector((state) => state.postReducer);

  const dispatch = useDispatch()
  const {setPrivatePosts} = bindActionCreators(postActionCreators,dispatch)

  useEffect(()=>{
    if(!authtoken){
      toast.info("Login First to see posts")
      navigate('/login')
    }else{
      axios.post('http://localhost:7000/posts/draft',{authtoken}).then(response=>{;
          const privatepost = response.data.filter(post=>post.visibility===true?null:post);
          setPrivatePosts(privatepost)
      }).catch(error=>{
        toast.error(error.response.data.msg)
      })
    }
  },[])
    
    return (
        <div>
      <h1 className="text-info">Private Posts</h1>
      <div className="row">
        {privatePosts.length ? privatePosts.map(item => (
          <div className="col-sm-4" key={item._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <div className="card-text">{item.text}</div>
              </div>
            </div>
          </div>
        )) :
          <div className='container mt-3' style={{ paddingLeft: '40vw'}}>
            <div className="card" style={{ width: '18rem' }}>
              <img src={MainImage} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">No Post Available</p>
                <Link className='btn btn-primary' to="/post">Publish Post</Link>
              </div>
            </div>
          </div>}
      </div>
    </div>
    )
}
