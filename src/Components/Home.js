import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import { postActionCreators } from '../Actions/index';
import OOps from '../assets/oops.png'
import renderHTML from 'react-render-html';

export default function Home() {
  const navigate = useNavigate()
  const { authtoken } = useSelector((state) => state.userReducer);
  const { publicPosts } = useSelector((state) => state.postReducer);

  const dispatch = useDispatch()
  const { setPublicPosts } = bindActionCreators(postActionCreators, dispatch)

  const [postsLiked,setPostsLiked]= useState([])
  const [postsDisliked,setPostsDisliked]= useState([])
  const [changeUI, setChangeUI] = useState(false)

  useEffect(() => {
    if (!authtoken) {
      toast.info("Login First to see posts")
      navigate('/login')
    } else {
        axios.post('http://localhost:7000/blog',{authtoken}).then(response => {
        console.log(response)
        const publicpost = response.data.posts.filter(post => post.visibility === true ? post : null);
        setPublicPosts(publicpost)
        setPostsLiked(response.data.postsLiked)
        setPostsDisliked(response.data.postsDisliked)
      }).catch(error => {
        toast.error(error.response.data.msg)
      })
    }
  }, [changeUI])

  const postLikeHandler = (id) =>{
    axios.put('http://localhost:7000/blog/like',{id, authtoken}).then(response=>{
      setChangeUI(!changeUI)
    }).catch(error=>{
      toast.error(error.response.data.msg)
      setChangeUI(!changeUI)
    })
  }

  const postDislikeHandler = (id) => {
    axios.put('http://localhost:7000/blog/dislike',{id, authtoken}).then(response=>{
      setChangeUI(!changeUI)
    }).catch(error=>{
      toast.error(error.response.data.msg)
      setChangeUI(!changeUI)
    })
  }

  return (
    <div className='container mt-3'>
      <h2 className="text-info my-2">All Posts</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {publicPosts!==null && publicPosts.length ? publicPosts.map(item => (
          <div className="col" key={item._id}>
            <div className="card" style={{borderRadius:'15px'}}>
              <div className="card-body" style={{backgroundColor:'black',color:'white'}}>
                <h5 className="card-title">{item.title}</h5>
                <div className="card-text">{renderHTML(item.text)}</div>
              </div>
              <div className='card-footer'>
                <div>
                {postsLiked!==null && postsLiked.includes(item._id)?
                <i style={{fontSize:'20px',color:'red'}} onClick={()=>postLikeHandler(item._id)} className='fas fa-thumbs-up'></i>:
                <i style={{fontSize:'20px'}} onClick={()=>postLikeHandler(item._id)} className='far fa-thumbs-up'></i>}
                <span className='mx-3'>{item.likes}</span>
                </div>
                <div>
                {postsDisliked!==null && postsDisliked.includes(item._id)?
                <i style={{fontSize:'20px'}} onClick={()=>postDislikeHandler(item._id)} className='fas fa-thumbs-down'></i>:
                <i style={{fontSize:'20px'}} onClick={()=>postDislikeHandler(item._id)} className='far fa-thumbs-down'></i>}
                <span className='mx-3'>{item.dislikes}</span>
                </div>
              </div>
            </div>
          </div>
        )) :
          <div className='container mt-3'>
            <div className="card" style={{ width: '18rem' }}>
              <img src={OOps} className="card-img-top" alt="..." />
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