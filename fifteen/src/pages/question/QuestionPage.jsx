import React, {Component} from 'react'
import './questionPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {Link, withRouter} from "react-router-dom";
import Review from "../../components/review/review";
import Arrow from "../../img/arrow.svg";
import Modal from "react-awesome-modal";
import Star from "../../img/star.svg";
import axios from "axios";
import {getCookie, setCookie} from "../../cookies";


class QuestionPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            AddressVisible: false,
            qna : []
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

    getQnA = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/qna/${getCookie("userSeq")}`,
            data: {},
            headers: {
                "Content-Type": 'application/json',
                "x-access-token" : getCookie('accessToken')
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
            <div>
                <Header />
                <div className="questionPage">
                    <div className="orderPage_line" />
                    <div className="orderPage__title">Q&A</div>
                    <div className="orderPage__main">
                        <PageSideNav />
                        <div>
                            <div className='order-info'>
                                <div className='order_info_title'>My Q&A</div>
                                <div className="qna-subject">
                                    <div className="qna-subject-num-product">상품</div>
                                    <div className="qna-subject-num-title">내용</div>
                                    <div className="qna-subject-num-date">등록일</div>
                                    <div className="qna-subject-num-answer">답변</div>
                                </div>
                                <ul className="review-list">
                                    {this.state.qna.map(arr=> (
                                        <li>
                                            <details>
                                                <summary className="qna-content">
                                                    <div className="qna-subject-num-product">{arr.product_title}</div>
                                                    <div className="qna-subject-num-title">{arr.content}</div>
                                                    <div className="qna-subject-num-date">{arr.readate}</div>
                                                    <div className="qna-subject-num-answer">
                                                        {!(arr.answer_state)? <div className='qna-subject-num-answer-text'>미답변</div> : <div className="qna-subject-num-answer-text">답변</div>}
                                                    </div>
                                                </summary>
                                                <div className='review-dropdown'>
                                                    <div className='review-dropdown-product'>
                                                        <div className='review-dropdown-product-head'>
                                                            <div className='review-dropdown-product-title'>상품 정보</div>
                                                            <Link to='/product/1/field'>
                                                                <div className='review-dropdown-product-star'>
                                                                    <img className='review-dropdown-product-star-starImg' src={Star} />
                                                                    <div className='review-dropdown-product-star-sub'>4.4 / 5.0 </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="review-dropdown-product-box">
                                                            <div className="review-dropdown-product-info">
                                                                <div className="order-info-box-info2">상품 제목 : {arr.title}</div>
                                                                <div className="order-info-box-quantity2">수량 : {arr.count}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='review-dropdown-user'>{arr.content}</div>
                                                    <div className='review-dropdown-admin'>
                                                        <img src={Arrow}/>
                                                        <div className='review-dropdown-admin-text'>{arr.answer}</div>
                                                    </div>
                                                    <div className="review-button3" onClick={()=>this._openModal()}>추가 문의
                                                        <Modal visible={this.state.AddressVisible} width="700" height='310' effect="fadeInDown" onClickAway={() => this._closeModal()}>
                                                            <div className='review-button-modal'>
                                                                <div className='review-button-modal-box'>
                                                                    <div className='review-button-modal-box-subject'>제목</div>
                                                                    <input type='text' className='review-button-modal-box-input' />
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
                                            </details>
                                        </li>
                                    ))}
                                </ul>


                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(QuestionPage);
