import React, {Component} from 'react';
import '../admin/admin_product.css';
import  './adminReview.css';

import {Link, withRouter} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNavProduct from "../../components/page_nav/AdminNavProduct";
import Review from "../../components/review/review";
import QnA from "../../components/Q&A/Q&A";
import {getCookie} from "../../cookies";
import AdminNav from "../../components/page_nav/admin_nav";
import moment from "moment";
import styles from "../../components/header/header.module.css";
import Star from "../../img/star.svg";
import Arrow from "../../img/arrow.svg";
import Modal from "react-awesome-modal";


class AdminQna extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddressVisible: false
        }
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

    render() {
        return(
            <div>
                <div className={styles.header}>
                    <div className={styles.header__box}>
                        <div className={styles.header__box__left}>
                            <div className={styles.header__box__left__title}>#FIFTEEN</div>
                            <div className={styles.header__box__left__category}>
                                Shopping mall specializing in domestic books
                            </div></div></div></div>
                <div className="admin">
                    <div className="admin-bar" />
                    <div className="admin-title">관리자 페이지</div>
                    <div className="admin-box">
                        <div className='admin-nav'>
                            <AdminNav />
                        </div>
                        <div className='admin-productEdit-info2'>
                            <div className="admin-productEdit-info-titleBox">
                                <div className="admin-productEdit-info-title-text">문의 관리</div>
                            </div>
                            <div className="qna">
                                <div className="review-box">
                                    <div className="qna-subject">
                                        <div className="qna-subject-num-product">제품 정보</div>
                                        <div className="qna-subject-num-title">제목</div>
                                        <div className="qna-subject-num-date">등록일</div>
                                        <div className="qna-subject-num-answer">답변</div>
                                    </div>
                                    <ul className="review-list">
                                        <li>
                                            <details>
                                                <summary className="qna-content">
                                                    <div className="qna-subject-num-product">상품</div>
                                                    <div className="qna-subject-num-title">내용</div>
                                                    <div className="qna-subject-num-date">등록일</div>
                                                    <div className="qna-subject-num-answer">
                                                            <div className="review-button4" onClick={()=>this._openModal()}>답변하기
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
                                                                <div className="order-info-box-date2">주문일자</div>
                                                                <div className="order-info-box-info2">상품 정보</div>
                                                                <div className="order-info-box-quantity2">수량</div>
                                                                <div className="order-info-box-price2">금액 </div>
                                                                <div className="order-info-box-state2">주문처리현황</div>
                                                            </div>
                                                        </div>
                                                    </div>

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminQna);
