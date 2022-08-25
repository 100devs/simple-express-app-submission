import axios from '../../axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useCommentMutation, useDeleteCommentMutation } from '../../Api/api'
import './Comments.css'

const Comments = ({recipe}) => {
    const user = useSelector(state => state.user)
    const {id} = useParams()
    const [addComment] = useCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState('')
    const [count, setCount] = useState('')


    //if I do comments for the dependency it uses a lot of memory
    useEffect(() => {
        axios.get(`/recipes/${id}/comments`).then(({data}) => {
            setComments(data.reverse())
            setCount(data.length)
        }).catch((error) => console.log(error))
    },[id, count])

    //is prevent default doing anything?
    const handleSubmit = async (e, id) => {
        e.preventDefault()
        await addComment({id: recipe._id, comment: comment, userId: user._id, userName: user.userName})
        setComments([...comments])
        setComment('')
        setCount(count + 1)
    }

  return (
    <div className='comment-outer'>
        <h2>{count} Comments</h2>
        {!user? <div><h4>Login to comment!</h4></div> 
            : <div className='new-comment'>
            <textarea className='comment-text' value={comment} onChange={(e) => setComment(e.target.value)} cols="30" rows="2"></textarea>
            <button className='btn comment-btn' disabled={!comment} onClick={handleSubmit}>Comment</button>
            </div>
            }
        <div className='comment-container'>
            {comments.length === 0 ? <h3>Be the first to comment!</h3> : 
            comments.map((comment) => (
                <div className='comment' style={{whiteSpace: "pre-line"}}>
                    <Link to={`/profile/${comment.userId}`}><span className='comment-poster'>{comment.poster}: </span></Link>
                    <div className='outer-comment-box'>
                        <div className='comment-box'>
                            <span className='comment-comment'>{comment.comment}</span>
                            <span className='comment-date'>{comment.date}</span>
                        
                            {!user? '' : user._id === comment.userId && <span className='comment-delete-x' onClick={() => {deleteComment({id: recipe._id, comment: comment._id}); setCount(count - 1);}}>X</span>}
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default Comments