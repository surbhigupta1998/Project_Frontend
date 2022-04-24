import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import { postActionCreators } from '../Actions/index';
import MainImage from '../main_image1.jpeg'

export default function Home() {
  const navigate = useNavigate()
  const { authtoken } = useSelector((state) => state.userReducer);
  const { publicPosts } = useSelector((state) => state.postReducer);

  const dispatch = useDispatch()
  const { setPublicPosts } = bindActionCreators(postActionCreators, dispatch)

  useEffect(() => {
    if (!authtoken) {
      toast.info("Login First to see posts")
      navigate('/login')
    } else {
        axios.get('http://localhost:7000/posts').then(response => {
        const publicpost = response.data.filter(post => post.visibility === true ? post : null);
        setPublicPosts(publicpost)
      }).catch(error => {
        toast.error(error.response.data.msg)
      })
    }
  }, [])

  return (
    <div>
      <h1 className="text-info">All Posts</h1>
      <div className="row">
        {publicPosts.length ? publicPosts.map(item => (
          <div className="col-sm-4" key={item._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <div className="card-text">{item.text}</div>
              </div>
            </div>
          </div>
        )) :
          <div className='container mt-3' style={{ paddingLeft: '40vw' }}>
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