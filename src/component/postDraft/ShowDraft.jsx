import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postFetch, saveToDraft } from '../../Action/post'

export default function DraftPost() {
    const posts = useSelector((state) => state.postReducer.users)
    console.log("users", posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postFetch())
    }, []);

    const gotoDraft = (item)=>{
        dispatch(saveToDraft(item))
    }
    return (
        <div>
            <h1>My All Draft Post</h1>
            <div className="row">
                {posts && posts.map((item) => (
                    item.status === "draft" ?
                        <div className="col-sm-6" key={item._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">{item.title}</h3>
                                    <div className="card-text">{item.text}</div>
                                    <div>
                                        <br />
                                        <button className='btn-publish' onClick={()=>gotoDraft(item)}>Publish</button>
                                    </div>
                                </div>
                            </div>
                        </div> : ""
                ))}
            </div>
        </div>
    )
}
