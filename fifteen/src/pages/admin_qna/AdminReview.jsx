import React, {Component} from 'react';
import '../admin/admin_product.css';

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


class AdminReview extends Component {

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
                        <AdminNavProduct />
                        <div className='admin-nav-padding'/>
                        <AdminNav />
                    </div>
                    <div className='admin-productEdit-info'>
                        <div className="admin-productEdit-info-titleBox">
                            <div className="admin-productEdit-info-title-text">Review 확인</div>
                        </div>
                        <div id='review' className='product-detail-box-summary'>
                            <div className='product-detail-box-summary-imgBox'>
                                <img className='product-detail-box-summary-imgBox-img' />
                            </div>
                            <div className='product-detail-box-summary-info1'>
                                <div className='product-detail-box-summary-info-category'></div>
                                <div className='product-detail-box-summary-info-title'></div>
                                <div className='product-detail-box-summary-info-price'>원</div>
                            </div>
                            <div className='product-detail-box-summary-info2'>
                                <div className='product-detail-box-summary-info-score'>
                                    <img className='product-detail-box-summary-info-starImg' src={Star}/>
                                    <div className='product-detail-box-summary-info-sub'>4.4 / 5.0 </div>
                                </div>
                            </div>
                        </div>
                        <Review />
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default withRouter(AdminReview);
