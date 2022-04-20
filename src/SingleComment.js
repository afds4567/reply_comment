import React, { useState } from 'react';
import { Comment, Avatar, Input } from 'antd';
import Axios from 'axios';
import { useRecoilValue } from 'recoil';
import { _user } from './modules/recoil/user';
const { TextArea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const user = useRecoilValue(_user); 

  const onsubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.lastName,
      postId: props.postId,
      responseTo: props.comment.postId,
    };
    Axios.post('http://localhost:3001/comment', variables).then((response) => {
      if (response.data!==undefined) {
          console.log(response.data);
          console.log('SingleComment');
        setCommentValue(''); //저장후 빈칸으로 만들기 위해
        props.refreshFunction(response.data);
      } else {
        alert('커멘트를 저장하지 못했습니다.');
      }
    });
  };
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer}
        avatar={<Avatar src={props.comment.writer} alt='default' />}
        content={<p>{props.comment.content}</p>}
      />
      {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onClick={onsubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;