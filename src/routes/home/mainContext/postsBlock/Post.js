import CredentialContext from '../../../../credentialsContext';
import styled from "styled-components";
import CommentsBlock from '../commentsBlock/CommentsBlock';

const StyledPost = styled(Post)`
  border: solid red 1px;
  min-width: 60vmin;
`

function Post({post, setState, className, children}) {
  return (
    <CredentialContext.Consumer>
      {(context) => {
        const date = new Date(post.date);
        const formatDate = date.toLocaleString('ru');

        return (
          <div className={className + ' post'}>
            <div className="author">{post.author.username}</div>
            <div className="date">{formatDate}</div>
            <h2>{post.title}</h2>
            <div className="content">{post.text}</div>
            <CommentsBlock post={post} serverLink={context.serverLink} />
          </div>
        )
      }}
    </CredentialContext.Consumer>
  )
}

export default StyledPost;