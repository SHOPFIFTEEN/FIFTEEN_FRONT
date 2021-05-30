import React, {Component} from 'react'
import './review.css';
import Arrow from '../../img/arrow.svg';
import Modal from 'react-awesome-modal';
import {Link} from "react-router-dom";

class Review extends Component{
    constructor(props) {
        super(props);
        this.state = {
            AddressVisible: false
        };
    }
    _openModal = function() {
        this.setState({
            AddressVisible : true
        });
    }

    _closeModal = function() {
        this.setState({
            AddressVisible : false
        });
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
                <div className="review-button" onClick={() => this._openModal()}>write
                    <Modal visible={this.state.AddressVisible} width="700" height='410' effect="fadeInDown" onClickAway={() => this._closeModal()}>
                        <div className='review-button-modal'>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>제목</div>
                                <input type='text' className='review-button-modal-box-input' />
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>추천</div>
                                <label><input type='radio' name='recommend' className='review-button-modal-box-check'/>적극추천</label>
                                <label><input type='radio' name='recommend' className='review-button-modal-box-check'/>추천</label>
                                <label><input type='radio' name='recommend' className='review-button-modal-box-check'/>비추천</label>
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>배송</div>
                                <label><input type='radio' name='delivery' className='review-button-modal-box-check'/>빠름</label>
                                <label><input type='radio' name='delivery' className='review-button-modal-box-check'/>보통</label>
                                <label><input type='radio' name='delivery' className='review-button-modal-box-check'/>느림</label>
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>별점</div>
                                <label><input type='radio' name='star' className='review-button-modal-box-check'/>1점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check'/>2점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check'/>3점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check'/>4점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check'/>5점</label>
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>내용</div>
                                <input type='text' className='review-button-modal-box-input2' />
                            </div>
                            <div className='review-modal-button'>
                            <input className='review-modal-cancel' value='취소' type='button' onClick={() => this._closeModal()}/>
                            <input className='review-modal-cancel' value='등록' type='button' onClick={() => this._closeModal()}/>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )

    }
}
export default Review;