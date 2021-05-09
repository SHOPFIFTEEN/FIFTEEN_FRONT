import React, {Component} from 'react'
import '../review/review.css';

class QnA extends Component{
    render(){
        return(
           <div className="qna">
               <div className="review-title">Q&A</div>
               <div className="review-text">질문을 남겨주세요</div>
               <div className="review-box">
                   <div className="review-subject">
                       <div className="review-subject-num">번호</div>
                       <div className="review-subject-content">제목</div>
                       <div className="review-subject-author">작성자</div>
                   </div>
                       <div className="review-subject">
                           <div className="review-subject-num"> </div>
                           <div className="review-subject-content"> </div>
                           <div className="review-subject-author"/>
                       </div>
               </div>
               <button className="review-button">write</button>
           </div>
        )
    }
}
export default QnA;