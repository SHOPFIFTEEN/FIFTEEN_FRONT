import React, {Component} from 'react'
import './review.css';
import Arrow from '../../img/arrow.svg';
import Modal from 'react-awesome-modal';
import {Link} from "react-router-dom";
import axios from "axios";
import _ from 'lodash';
import {getCookie} from "../../cookies";

class Review extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            reviews : [],
            title : '',
            content : '',
            score : 0,
            delivery : '',
            recommend : '',
            change : 0,
            scoreAverage : 0
        }
    }

    openModal = ()=> {
        this.setState({
            visible : true
        })
    }

    closeModal = () => {
        this.setState({
            visible : false
        })
    }

    handleChangeTitle = (e) => {
        this.setState({title: e.target.value})
    }
    handleChangeContent = (e) => {
        this.setState({content: e.target.value})
    }
    handleChangeScore = (e1) => {
        this.setState({score: e1})
    }
    handleChangeDelivery = (e1) => {
        this.setState({delivery: e1})
    }
    handleChangeRecommend = (e1) => {
        this.setState({recommend: e1})
    }

    getReview = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/review/${this.props.productSeq}`,
            data: {},
            headers: {
                "Content-Type": 'application/json',
            },
        })
        var ave = _.meanBy(result.data, 'score');
        this.setState({
            reviews : result.data,
            scoreAverage: ave
        })
    }

    addReview = async function () {
        const {title, content, score, delivery, recommend} = this.state;
        console.log(title, content, score, delivery, recommend);
        if(title==='' || content==='' || score==='' || delivery==='' || recommend===''){
            alert('모든 칸을 입력하여주세요');
        }else{
            let result = await axios({
                method: 'POST',
                url: `http://52.79.196.94:3001/review/add`,
                data: {
                    title : title,
                    content : content,
                    score : score,
                    delivery : delivery,
                    recommend : recommend,
                    productSeq : this.props.productSeq
                },
                headers: {
                    "Content-Type": 'application/json',
                    "x-access-token" : getCookie("accessToken")
                },
            }).then((response)=> {
                if(response.status===200){
                    console.log('200!')
                }
            })
            this.setState({
                visible : false,
                change : 1
            })
        }
    }

    componentDidMount() {
        this.getReview();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.change!==this.state.change){
            this.getReview();
            this.setState({
                change : 0
            })
        }
    }

    render(){
        return(
            <div className="review">
                <div className="review-box">
                    <div className="review-subject">
                        <div className="review-subject-recommend">추천</div>
                        <div className="review-subject-delivery">배송</div>
                        <div className="review-subject-title">제목</div>
                        <div className="review-subject-author">작성자</div>
                        <div className="review-subject-date">등록일</div>
                    </div>
                    <ul className="review-list">
                                {this.state.reviews.map(arr=> (
                                    <li key={arr.reviewSeq}>
                                    <details>
                                        <summary className="review-content">
                                            <div className="review-subject-recommend">
                                                <div className='review-content-box-recommend'>{arr.recommend}</div>
                                            </div>
                                            <div className="review-subject-delivery">
                                                <div className='review-content-box-delivery'>{arr.delivery}</div>
                                            </div>
                                            <div className="review-subject-title">{arr.title}</div>
                                            <div className="review-subject-author">{arr.user_id}</div>
                                            <div className="review-subject-date">{arr.readate}</div>
                                        </summary>
                                        <div className='review-dropdown'>
                                            <div className='review-dropdown-user'>{arr.content}</div>
                                            <div className='review-dropdown-admin'>
                                            </div>
                                        </div>
                                    </details>
                                    </li>
                                ))}
                    </ul>
                </div>
                <div className="review-button" onClick={() => this.openModal()}>write
                    <Modal visible={this.state.visible} width="700" height='410' effect="fadeInDown" onClickAway={() => this.closeModal()}>
                        <div className='review-button-modal'>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>제목</div>
                                <input type='text' className='review-button-modal-box-input' onChange={this.handleChangeTitle}/>
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>추천</div>
                                <label><input type='radio' name='recommend' className='review-button-modal-box-check' onClick={()=>this.handleChangeRecommend('적극추천')}/>적극추천</label>
                                <label><input type='radio' name='recommend' className='review-button-modal-box-check' onClick={()=>this.handleChangeRecommend('추천')}/>추천</label>
                                <label><input type='radio' name='recommend' className='review-button-modal-box-check' onClick={()=>this.handleChangeRecommend('비추천')}/>비추천</label>
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>배송</div>
                                <label><input type='radio' name='delivery' className='review-button-modal-box-check' onClick={()=>this.handleChangeDelivery('빠름')}/>빠름</label>
                                <label><input type='radio' name='delivery' className='review-button-modal-box-check' onClick={()=>this.handleChangeDelivery('보통')}/>보통</label>
                                <label><input type='radio' name='delivery' className='review-button-modal-box-check' onClick={()=>this.handleChangeDelivery('느림')}/>느림</label>
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>별점</div>
                                <label><input type='radio' name='star' className='review-button-modal-box-check' onClick={()=>this.handleChangeScore(1)}/>1점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check' onClick={()=>this.handleChangeScore(2)}/>2점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check' onClick={()=>this.handleChangeScore(3)}/>3점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check' onClick={()=>this.handleChangeScore(4)}/>4점</label>
                                <label><input type='radio' name='star' className='review-button-modal-box-check' onClick={()=>this.handleChangeScore(5)}/>5점</label>
                            </div>
                            <div className='review-button-modal-box'>
                                <div className='review-button-modal-box-subject'>내용</div>
                                <input type='text' className='review-button-modal-box-input2' onChange={this.handleChangeContent}/>
                            </div>
                            <div className='review-modal-button'>
                            <input className='review-modal-cancel' value='취소' type='button' onClick={() => this.closeModal()}/>
                            <input className='review-modal-cancel' value='등록' type='button' onClick={()=>this.addReview()}/>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )

    }
}
export default Review;