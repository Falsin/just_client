import { useState } from "react";

export default function AddCommentBlock({post, serverLink, getComments}) {
  const [commentData, setCommentData] = useState({text: ''});

  async function submit(e) {
    e.preventDefault();

    let request = await fetch(serverLink + '/comment', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        ...post,
        comment: commentData
      })
    })
    
    if (request) {
      setCommentData({text: ''})
      getComments();
    }
  }

  return (
    <form onSubmit={submit}>
      <textarea name='text' onChange={e => setCommentData({text: e.target.value})} value={commentData.text} />
      <button>Add comment</button>
    </form>
  )
}