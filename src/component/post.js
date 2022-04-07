import React from 'react'
import './post.css'
export default function post() {
  return (
    <div className='container'>
        <div className='wrapper'>
            <form className='form-wrapper'>
                <div>
                    <input
                        className='input'
                        type="text"
                        placeholder="Title"
                        name="title"
                    />
                </div>
                <div>
                    <input
                        className='input'
                        type="text"
                        placeholder="Desc"
                        name="desc"
                    />
                </div>
                <div>
                    <input
                        className='input'
                        type="text"
                        placeholder="Photo"
                        name="photo"
                    />
                </div>
                <div>
                    <input
                        className='input'
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                </div>
                <div>
                    <input
                        className='input'
                        type="text"
                        placeholder="Categories"
                        name="categories"
                    />
                </div>
                <div>
                    <button className='btn'>Post</button>
            

                </div>
            </form>
        </div>
    </div>
);
}
