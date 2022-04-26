import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import { postActionCreators } from '../Actions/index';
import MainImage from '../assets/main_image1.jpeg'
import renderHTML from 'react-render-html';

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
    <div className='container mt-3'>
      <h1 className="text-info my-2">All Posts</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {publicPosts.length ? publicPosts.map(item => (
          <div className="col" key={item._id}>
            <div className="card" style={{borderRadius:'15px'}}>
              <div className="card-body" style={{backgroundColor:'black',color:'white'}}>
                <h5 className="card-title">{item.title}</h5>
                <div className="card-text">{renderHTML(item.text)}</div>
              </div>
              <div className='card-footer'>
                <i style={{fontSize:'20px',color:'red'}} className='fas fa-thumbs-up'></i>
                <i style={{fontSize:'20px'}} className='far fa-thumbs-down'></i>
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