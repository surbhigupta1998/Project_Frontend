import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postFetch } from '../Action/post';

export default function Home() {
  const posts = useSelector((state) => state.postReducer.users)
  console.log("users==============", posts)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(postFetch())
  }, []);

  return (
    <div>
      <h1 class="text-info">My All Post</h1>
      <div className="row">
      {posts && posts.map((item) => (
        item.status==="success"?
        <div className="col-sm-4" key={item._id}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <div className="card-text">{item.text}</div>
            
          </div>
        </div>
      </div>:""
      ))}
      </div>
    </div>
  )
}