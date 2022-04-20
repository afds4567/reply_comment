import React, { useState } from "react";
import Axios from "axios";
import { useRecoilValue } from 'recoil';
import { _user } from './modules/recoil/user';
import SingleComment from './SingleComment';
 function Comment(props) {
    const videoId = props.postId;
    // 부모로부터 props로 전달받은 postId를 videoId라고 한다.
    const user = useRecoilValue(_user); 
    // 리덕스를 이용하여 로그인유저 정보를 가져옴
    const [commentValue, setCommentValue] = useState("");
    // textarea에서 작성한 댓글 내용이 저장됨
    const handleChange = (event) => {
    setCommentValue(event.currentTarget.value);
    };
    const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.lastName,
      postId: videoId,
        };
        Axios.post("http://localhost:3001/comment", variables).then((response) => {
      if (response.data!==undefined) {
        props.refreshFunction(response.data);
        // 부모컴포넌트에 DB에 저장된 댓글정보를 전달해줌
        setCommentValue("");
        props.refreshFunction(response.data);
      } else {
          console.log(response.data);
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
    };
    return (
    <div>
    <br />
      <p>Replies</p>
      <hr />
      {/* Comment Lists */}
      {/* {props.commentList &&
              props.commentList.map(
                (comment, index) =>
                  !comment.responseTo && (
                    <SingleComment
                      refreshFunction={props.refreshFunction}
                      comment={comment}
                      postId={props.postId}
                      key={index}
                    />
                  )
              )} */}
      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;