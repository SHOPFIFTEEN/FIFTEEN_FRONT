import React, {Component} from 'react'
import '../review/review.css';
import './Q&A.css';
import Arrow from "../../img/arrow.svg";
import Modal from "react-awesome-modal";
import axios from "axios";
import _ from "lodash";

class QnA extends Component{
    render(){
        return(
           <div className="qna">
    constructor(props) {
        super(props);
        this.state = {
            AddressVisible: false,
            qna : []
        };
    }
    openModal = ()=> {
        this.setState({
            AddressVisible : true
        });
    }

    closeModal = ()=> {
        this.setState({
            AddressVisible : false
        });
    }

    getQnA = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/qna/${this.props.productSeq}`,
            data: {},
            headers: {
                "Content-Type": 'application/json',
            },
        })
        this.setState({
            qna : result.data,
        })
    }

    componentDidMount() {
        this.getQnA();
    }

    render(){
        return(
           <div className="qna">
               <div className="review-box">
                   <div className="qna-subject">
                       <div className="qna-subject-num-kinds">제목</div>
                       <div className="qna-subject-num-title">내용</div>
                       <div className="qna-subject-num-date">등록일</div>
                       <div className="qna-subject-num-answer">답변</div>
                   </div>
                   <ul className="review-list">
                       {this.state.qna.map(arr=>(
                           <li key={arr.qnaSeq}>
                               <details>
                                   <summary className="qna-content">
                                       <div className="qna-subject-num-kinds">
                                           <div className="qna-subject-num-kinds-text">{arr.title}</div>
                                       </div>
                                       <div className="qna-subject-num-title">{arr.content}</div>
                                       <div className="qna-subject-num-date">{arr.readate}</div>
                                       <div className="qna-subject-num-answer">
                                           <div className="qna-subject-num-answer-text">{arr.answer}</div>
                                       </div>
                                   </summary>
                                   <div className='review-dropdown'>
                                       <div className='review-dropdown-user'>{arr.content}</div>
                                       <div className='review-dropdown-admin'>
                                           <img src={Arrow}/>
                                           {!(arr.answer_state) ? <div>답변 미등록</div> : <div className='review-dropdown-admin-text'>{arr.answer}</div>}
                                       </div>
                                   </div>
                               </details>
                           </li>
                       ))}
                   </ul>
               </div>
               <div className="review-button" onClick={()=>this.openModal()}>write
                   <Modal visible={this.state.AddressVisible} width="700" height='340' effect="fadeInDown" onClickAway={() => this.closeModal()}>
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
                               <input className='review-modal-cancel' value='취소' type='button' onClick={() => this.closeModal()}/>
                               <input className='review-modal-cancel' value='등록' type='button' onClick={() => this.closeModal()}/>
                           </div>
                       </div>
                   </Modal>
               </div>
           </div>
        )
    }
}
export default QnA;