import React, {Component} from 'react'
import './review.css';
import Arrow from '../../img/arrow.svg';
import Modal from 'react-awesome-modal';
import {Link} from "react-router-dom";

class Review extends Component{
    constructor(props) {
        super(props);

    }

        render(){
        return(
            <div className="review">
                <div className="review-box">
                    <div className="review-subject">
                        <div className="review-subject-recommend">추천</div>
                        <div className="review-subject-delivery">배송</div>
                        <div className="review-subject-title">내용</div>
                        <div className="review-subject-author">작성자</div>
                        <div className="review-subject-date">등록일</div>
                    </div>
                    <ul className="review-list">
                        <li>
                            <details>
                                <summary className="review-content">
                                    <div className="review-subject-recommend">
                                        <div className='review-content-box-recommend'>추천</div>
                                    </div>
                                    <div className="review-subject-delivery">
                                        <div className='review-content-box-delivery'>빠름</div>
                                    </div>
                                    <div className="review-subject-title">내용</div>
                                    <div className="review-subject-author">작성자</div>
                                    <div className="review-subject-date">등록일</div>
                                </summary>
                                <div className='review-dropdown'>
                                    <div className='review-dropdown-user'>좋아요!</div>
                                    <div className='review-dropdown-admin'>
                                    </div>
                                </div>
                            </details>
                        </li>
                    </ul>
                </div>

            </div>
        )

    }
}
export default Review;