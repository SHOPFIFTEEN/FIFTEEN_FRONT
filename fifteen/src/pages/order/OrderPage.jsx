import React, {Component} from 'react'
import './orderPage.css';
import '../../components/review/review.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter} from "react-router-dom";
import Modal from "react-awesome-modal";
import axios from "axios";
import {getCookie} from "../../cookies";

class OrderPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Visible1: false,
            Visible2: false,
            orderList : [],
            title : '',
            content : '',
            score : '',
            delivery : '',
            recommend : '',
            productSeq : ''
        }
    }
    _openModal1 = function() {
        this.setState({
            Visible1 : true
        });
    }
    _openModal2 = function() {
        this.setState({
            Visible2 : true
        });
    }


    _closeModal = function() {
        this.setState({
            AddressVisible : false
        });
    }

    addReview = async  (e)=> {
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
                    productSeq : e
                },
                headers: {
                    "Content-Type": 'application/json',
                    "x-access-token" : getCookie("accessToken")
                },
            }).then((response)=> {
                if(response.status===200){
                    console.log('200!')
                    console.log(e)
                }
            })
            this.setState({
                Visible1 : false,
            })
        }
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
    handleChangeQnaTitle = (e1) => {
        this.setState({qnaTitle: e1})
    }
    handleChangeQnaContent= (e1) => {
        this.setState({qnaContent: e1})
    }

    order = async function() {
        var userSeq = getCookie("userSeq");
        let result = await axios({
            method : 'GET',
            url : `http://52.79.196.94:3001/order/${userSeq}`,
            data: {
            },
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": getCookie("accessToken")
            },
        })
        this.setState({
            orderList : result.data
        })
        console.log(this.state.orderList);
    }

    addQnA = async function (e) {
        const {qnaTitle, qnaContent} = this.state;
        console.log(e);
        let result = await axios({
            method: 'POST',
            url: `http://52.79.196.94:3001/qna/add/question`,
            data: {
                title : qnaTitle,
                content : qnaContent,
                productSeq : e
            },
            headers: {
                "Content-Type": 'application/json',
                "x-access-token" : getCookie("accessToken")
            },
        })
        this.setState({
            Visible2:  false
        })
    }

    componentDidMount() {
        this.order();
    }

    render(){
        return(
            <div>
                <Header />
                <div className="orderPage">
                    <div className="orderPage_line" />
                    <div className="orderPage__title">Order</div>
                    <div className="orderPage__main">
                        <PageSideNav />
                        <div>
                            <div className='order-info'>
                                <div className='order_info_title'>주문 상품 정보</div>
                                <div className="order_info_box">
                                    <div className="order-info-box-title">
                                        <div className="order-info-box-date">주문일자</div>
                                        <div className="order-info-box-info">상품 정보</div>
                                        <div className="order-info-box-price">금액 </div>
                                        <div>배송지</div>
                                        <div className="order-info-box-state">주문처리현황</div>
                                        <div className='order-info-box-qna'>리뷰</div>
                                        <div className='order-info-box-qna'>문의하기</div>
                                    </div>
                                    <ul className="review-list">
                                        {this.state.orderList.map(arr=>(
                                            <li>
                                                <details>
                                                    <summary className="review-content2">
                                                        <div className="order-info-box-date">{arr.date}</div>
                                                        <div className="order-info-box-info">{arr.title}</div>
                                                        <div className="order-info-box-price">{arr.price}</div>
                                                        <div className="order-info-box-state">{arr.order_state}</div>
                                                        <div className='order-info-box-qna'>
                                                            <div className="review-button2" onClick={() => this._openModal1()}>등록
                                                                <Modal visible={this.state.Visible1} width="700" height='410' effect="fadeInDown" onClickAway={() => this._closeModal()}>
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
                                                                            <input className='review-modal-cancel' value='취소' type='button' onClick={() => this._closeModal()}/>
                                                                            <input className='review-modal-cancel' value='등록' type='button' onClick={() => this.addReview(arr.productSeq)}/>
                                                                        </div>
                                                                    </div>
                                                                </Modal>
                                                            </div>
                                                        </div>
                                                        <div className='order-info-box-qna'>
                                                            <div className="review-button2" onClick={()=>this._openModal2()}>문의
                                                                <Modal visible={this.state.Visible2} width="700" height='310' effect="fadeInDown" onClickAway={() => this._closeModal()}>
                                                                    <div className='review-button-modal'>
                                                                        <div className='review-button-modal-box'>
                                                                            <div className='review-button-modal-box-subject'>제목</div>
                                                                            <input type='text' className='review-button-modal-box-input' onChange={this.handleChangeQnaTitle} />
                                                                        </div>
                                                                        <div className='review-button-modal-box'>
                                                                            <div className='review-button-modal-box-subject'>내용</div>
                                                                            <input type='text' className='review-button-modal-box-input2' onChange={this.handleChangeQnaContent} />
                                                                        </div>
                                                                        <div className='review-modal-button'>
                                                                            <input className='review-modal-cancel' value='취소' type='button' onClick={() => this._closeModal()}/>
                                                                            <input className='review-modal-cancel' value='등록' type='button' onClick={() => this.addQnA(arr.productSeq)}/>
                                                                        </div>
                                                                    </div>
                                                                </Modal>
                                                            </div>
                                                        </div>
                                                    </summary>
                                                    <div className='review-dropdown2'>
                                                        <div className='review-dropdown-box'>
                                                            <div className='order-dropdown-subject'>주문일자</div>
                                                            <div className='order-dropdown-text'>{arr.date}</div>
                                                        </div>
                                                        <div className='review-dropdown-box'>
                                                            <div className='order-dropdown-subject'>배송지</div>
                                                            <div className='order-dropdown-text'>{arr.delivery}</div>
                                                        </div>
                                                        <div className='review-dropdown-box'>
                                                            <div className='order-dropdown-subject'>상품명</div>
                                                            <div className='order-dropdown-text'>{arr.title}</div>
                                                        </div>
                                                        <div className='review-dropdown-box'>
                                                            <div className='order-dropdown-subject'>수량</div>
                                                            <div className='order-dropdown-text'>{arr.count}</div>
                                                        </div>
                                                        <div className='review-dropdown-box'>
                                                            <div className='order-dropdown-subject'>금액</div>
                                                            <div className='order-dropdown-text'>{arr.price}</div>
                                                        </div>
                                                        <div className='review-dropdown-box'>
                                                            <div className='order-dropdown-subject'>총 금액</div>
                                                            <div className='order-dropdown-text'>{arr.price}</div>
                                                        </div>
                                                    </div>
                                                </details>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="order_paging">
                                    <button className="order_paging_before">&lt;</button>
                                    <button className="order_paging_this">1</button>
                                    <button className="order_paging_after">&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(OrderPage);
