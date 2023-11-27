

import React from 'react'
import ViewPostCommentComponent from './ViewPostCommentComponent';

const ViewPostCommentContainer = ({postcomments}) =>{

  console.log(postcomments);
    
  return (
    <div>
        {
            ((postcomments) && (0 < postcomments.length))&&
              postcomments.map((comment, index)=>{
                  return <ViewPostCommentComponent key={index} postcomment = {comment}/>
            })
        }
    </div>
  )
}

export default ViewPostCommentContainer;
