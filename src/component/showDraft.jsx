import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useNavigate } from 'react-router-dom'
import { postFetch} from '../Action/post'
// import { Link } from 'react-router-dom'
// import { FaEdit } from 'react-icons/fa'
export default function DraftPost() {
    const posts = useSelector((state) => state.postReducer.draftPost)
    console.log("posts============", posts)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    useEffect(() => {
        dispatch(postFetch())
    }, []);

    // const handleChange = (item) => {
    //     dispatch(saveToDraft(item))
    //     navigate('/post')
    // }

    // const gotoDraft = (item) => {
    //     dispatch(saveToDraft(item))
    //     navigate('/editdraft')
    // }
    
    return (
        <div>
            <h1>My All Draft Post</h1> 
            <div className="row">
                {posts && posts.map((item) => (
                    item.status === 'success'?
                        <div className="col-sm-6" key={item._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">{item.title}</h3>
                                    <div className="card-text">{item.text}</div>
                                    {/* <div>
                                        <br />
                                        <Link to={`/editusers/${posts._id}`} state={{ posts: posts }}>
                                            <i><FaEdit /></i>
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                        </div> : ""
                ))}
            </div>
        </div>
    )
}
