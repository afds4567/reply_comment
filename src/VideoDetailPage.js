import React, { useState,useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";

export default function VideoDetailPage(props) {
  const videoId = 1;
  // 해당페이지의 params에서 비디오 id를 저장
  
  const [Comments, setComments] = useState([]);
  // Comments(댓글)가 담길 빈 배열을 만들어준다.
    useEffect(() => {
        
    axios.get(`http://localhost:3001/comment/`).then((response) => {
      if (response.data) {
          setComments([response.data]);
        } else {
        alert('코멘트 정보를 가져오는 것을 실패 하였습니다.');
        }
        ;
    });  
    },[] );
    console.log(`here:`);
    console.log(Comments);
    const tempcomment = Comments.filter(comment => comment.postId === videoId);
    console.log([tempcomment]);
    const refreshFunction = (newComment) => {
    // 자식컴포넌트에서 버튼을 클릭하면 자식에서 받아온 comment정보(새 댓글)를 newComment라고 한다.
    setComments(Comments.concat(newComment));
    // Comments(댓글)가 담긴 배열에 자식에서 받아온 newComment(새 댓글)를 추가한다.
    };
    
    return (
	
        <Comment
           refreshFunction={refreshFunction}
           commentLists={Comments}
           postId={videoId}
        />
        // {/* Comment 컴포넌트(자식 컴포넌트)에 props로 댓글 추가함수(refreshFunction),댓글 목록의 정보(commentLists), 해당 게시글의 id(postId)를 넘겨준다. */}
	
  );
};