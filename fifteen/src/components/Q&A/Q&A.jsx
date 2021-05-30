import React, {Component} from 'react'
import '../review/review.css';
import './Q&A.css';
import Arrow from "../../img/arrow.svg";
import Modal from "react-awesome-modal";

class QnA extends Component{
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
           <div className="qna">
               <div className="review-box">
                   <div className="qna-subject">
                       <div className="qna-subject-num-kinds">종류</div>
                       <div className="qna-subject-num-title">내용</div>
                       <div className="qna-subject-num-date">등록일</div>
                       <div className="qna-subject-num-answer">답변</div>
                   </div>
                   <ul className="review-list">
                       <li>
                           <details>
                               <summary className="qna-content">
                                   <div className="qna-subject-num-kinds">
                                       <div className="qna-subject-num-kinds-text">종류</div>
                                   </div>
                                   <div className="qna-subject-num-title">내용</div>
                                   <div className="qna-subject-num-date">등록일</div>
                                   <div className="qna-subject-num-answer">
                                       <div className="qna-subject-num-answer-text">답변</div>
                                   </div>
                               </summary>
                               <div className='review-dropdown'>
                                   <div className='review-dropdown-user'>모르겠어요</div>
                                   <div className='review-dropdown-admin'>
                                       <img src={Arrow}/>
                                       <div className='review-dropdown-admin-text'>넵 저도요</div>
                                   </div>
                               </div>
                           </details>
                       </li>
                   </ul>
               </div>
               <div className="review-button" onClick={()=>this._openModal}>write
                   <Modal visible={this.state.AddressVisible} width="700" height='340' effect="fadeInDown" onClickAway={() => this._closeModal()}>
                       <div className='review-button-modal'>
                           <div className='review-button-modal-box'>
                               <div className='review-button-modal-box-subject'>제목</div>
                               <input type='text' className='review-button-modal-box-input' />
                           </div>
                           <div className='review-button-modal-box'>
                               <div className='review-button-modal-box-subject'>종류</div>
                               <label><input type='checkbox' className='review-button-modal-box-check'/>상품</label>
                               <label><input type='checkbox' className='review-button-modal-box-check'/>배송</label>
                               <label><input type='checkbox' className='review-button-modal-box-check'/>반품/취소</label>
                               <label><input type='checkbox' className='review-button-modal-box-check'/>기타</label>
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
export default QnA;