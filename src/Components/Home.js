import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import { postActionCreators } from '../Actions/index';
import OOps from '../assets/oops.png'
import renderHTML from 'react-render-html';
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { authtoken } = useSelector((state) => state.userReducer);
  const { publicPosts } = useSelector((state) => state.postReducer);

  const dispatch = useDispatch()
  const { setPublicPosts } = bindActionCreators(postActionCreators, dispatch)

  const [postsLiked, setPostsLiked] = useState([])
  const [postsDisliked, setPostsDisliked] = useState([])
  const [changeUI, setChangeUI] = useState(false)
  const [commentTrigger, setCommentTrigger] = useState(false)
  const [commentTriggerId, setCommentTriggerId] = useState(false)
  const [comment, setComment] = useState(null)

  useEffect(() => {
    if (!authtoken) {
      toast.info("Login First to see posts")
      navigate('/login')
    } else {
      axios.post('http://localhost:7000/blog', { authtoken }).then(response => {
        console.warn(response.data)
        const publicpost = response.data.posts.filter(post => post.visibility === true ? post : null);
        setPublicPosts(publicpost)
        setPostsLiked(response.data.postsLiked)
        setPostsDisliked(response.data.postsDisliked)
      }).catch(error => {
        toast.error(error.response.data.msg)
      })
    }
  }, [changeUI])

  const postLikeHandler = (id) => {
    axios.put('http://localhost:7000/blog/like', { id, authtoken }).then(response => {
      setChangeUI(!changeUI)
    }).catch(error => {
      toast.error(error.response.data.msg)
      setChangeUI(!changeUI)
    })
  }

  const postDislikeHandler = (id) => {
    axios.put('http://localhost:7000/blog/dislike', { id, authtoken }).then(response => {
      setChangeUI(!changeUI)
    }).catch(error => {
      toast.error(error.response.data.msg)
      setChangeUI(!changeUI)
    })
  }

  const showComments = (id) => {
    setCommentTriggerId(id)
    setCommentTrigger(!commentTrigger)
  }

  const postComment = (id) => {
    axios.post('http://localhost:7000/blog/addComment',{id,authtoken,comment})
      .then(response=>{
        if(response.status(200))
          toast.success("Comment Added")
        else
          toast.error("Oops! Something went wrong!!")
        setChangeUI(!changeUI)
      }).catch(error=>{
        toast.error(error)
        setChangeUI(!changeUI)
      })
  }

  return (
    <div className='container mt-3'>
      <h2 className="text-info my-2">All Posts</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {publicPosts !== null && publicPosts.length ? publicPosts.map(item => (
          <div className="col" key={item._id}>
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body" style={{ backgroundColor: 'black', color: 'white' }}>
                <h5 className="card-title">{item.title}</h5>
                <div className="card-text">{item.text ? renderHTML(item.text) : null}</div>
              </div>
              <div className='card-footer'>
                <div>
                  {postsLiked !== null && postsLiked.includes(item._id) ?
                    <i style={{ fontSize: '20px', color: 'red' }} onClick={() => postLikeHandler(item._id)} className='fas fa-thumbs-up'></i> :
                    <i style={{ fontSize: '20px' }} onClick={() => postLikeHandler(item._id)} className='far fa-thumbs-up'></i>}
                  <span className='mx-3'>{item.likes}</span>
                </div>
                <div>
                  {postsDisliked !== null && postsDisliked.includes(item._id) ?
                    <i style={{ fontSize: '20px' }} onClick={() => postDislikeHandler(item._id)} className='fas fa-thumbs-down'></i> :
                    <i style={{ fontSize: '20px' }} onClick={() => postDislikeHandler(item._id)} className='far fa-thumbs-down'></i>}
                  <span className='mx-3'>{item.dislikes}</span>
                </div>
                <div>
                  <i className='far fa-comment' onClick={()=>showComments(item._id)} style={{ fontSize: '20px' }}></i>
                </div>
              </div>
              {commentTrigger && commentTriggerId===item._id && <div className='comments-box'>
                <div className='comments-input my-2'>
                  <input type="text" name="comment" placeholder='Add a comment...' onChange={(e)=>setComment(e.target.value)}/>
                  <i className="material-icons" onClick={()=>postComment(item._id)}>&#xe163;</i>
                </div>
                <div className='comments'>
                <div className='comment-item'>
                  <span>Chayan Gupta</span>
                  <h6>This is a comment.</h6>
                </div>
                <div className='comment-item'>
                  <span>Chayan Gupta</span>
                  <h6>This is a comment.</h6>
                </div>
                </div>
              </div>}
              
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