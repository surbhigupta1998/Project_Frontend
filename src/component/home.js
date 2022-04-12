import React, {  useEffect, useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postFetch } from '../Action/post';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const users = useSelector((state)=> state.postReducer.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postFetch())
  }, []);
  return (
    <div>
    <h1>{users.title}</h1>    
    </div>
  )
}
