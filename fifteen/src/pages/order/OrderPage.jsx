import React, {Component} from 'react'
import './orderPage.css';
import '../../components/review/review.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter} from "react-router-dom";
import Modal from "react-awesome-modal";

class OrderPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Visible1: false,
            Visible2: false
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
                                        <div className="order-info-box-state">주문처리현황</div>
                                        <div className='order-info-box-qna'>리뷰</div>
                                        <div className='order-info-box-qna'>문의하기</div>
                                    </div>
                                    <ul className="review-list">
                                        <li>
                                            <details>
                                                <summary className="review-content2">
                                                    <div className="order-info-box-date">a</div>
                                                    <div className="order-info-box-info">a</div>
                                                    <div className="order-info-box-price">a</div>
                                                    <div className="order-info-box-state">a</div>
                                                    <div className='order-info-box-qna'>
                                                        <div className="review-button2" onClick={() => this._openModal1()}>등록
                                                            <Modal visible={this.state.Visible1} width="700" height='410' effect="fadeInDown" onClickAway={() => this._closeModal()}>
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
                                                    <div className='order-info-box-qna'>
                                                        <div className="review-button2" onClick={()=>this._openModal2()}>문의
                                                            <Modal visible={this.state.Visible2} width="700" height='310' effect="fadeInDown" onClickAway={() => this._closeModal()}>
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
                                                </summary>
                                                <div className='review-dropdown2'>
                                                    <div className='review-dropdown-box'>
                                                    <div className='order-dropdown-subject'>주문일자</div>
                                                    <div className='order-dropdown-text'>00</div>
                                                    </div>
                                                    <div className='review-dropdown-box'>
                                                        <div className='order-dropdown-subject'>배송지</div>
                                                        <div className='order-dropdown-text'>eeeeeeeeeeee</div>
                                                    </div>
                                                    <div className='review-dropdown-box'>
                                                        <div className='order-dropdown-subject'>상품명</div>
                                                        <div className='order-dropdown-text'>eeeeeeeeeeeee</div>
                                                    </div>
                                                    <div className='review-dropdown-box'>
                                                        <div className='order-dropdown-subject'>수량</div>
                                                        <div className='order-dropdown-text'>eeeeeeee</div>
                                                    </div>
                                                    <div className='review-dropdown-box'>
                                                        <div className='order-dropdown-subject'>금액</div>
                                                        <div className='order-dropdown-text'>eeeeeeee</div>
                                                    </div>
                                                    <div className='review-dropdown-box'>
                                                        <div className='order-dropdown-subject'>총 금액</div>
                                                        <div className='order-dropdown-text'>eeeeeeeeeee</div>
                                                    </div>
                                                </div>
                                            </details>
                                        </li>
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
