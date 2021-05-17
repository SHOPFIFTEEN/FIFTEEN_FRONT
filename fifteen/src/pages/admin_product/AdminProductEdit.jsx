import React, {Component} from 'react';
import '../admin/admin_product.css';
import  './adminProductEdit.css';
import {withRouter} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNavProduct from "../../components/page_nav/AdminNavProduct";
import Review from "../../components/review/review";
import QnA from "../../components/Q&A/Q&A";
import {getCookie} from "../../cookies";
import AdminNav from "../../components/page_nav/admin_nav";


class AdminProductInfo extends Component {
    render(){
        return(
            <div>
                <Header />
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
                                <div className="admin-productEdit-info-title-text">Information 수정</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>카테고리</div>
                                <div className='admin-productEdit-info-category'> </div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>제목</div>
                                <div className='admin-productEdit-info-title'> </div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>출판사</div>
                                <div className='admin-productEdit-info-publisher'> </div>

                            </div>
                            <div className='admin-productEdit-info-box'>

                                <div className='admin-productEdit-info-subject'>지은이</div>
                                <div className='admin-productEdit-info-author'> </div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>가격</div>
                                <div className='admin-productEdit-info-price'> </div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>수량</div>
                                <div className='admin-productEdit-info-cnt'> </div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>저자 소개</div>
                                <div className='admin-productEdit-info-authorIntro'> </div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>작품 소개</div>
                                <div className='admin-productEdit-info-intro'> </div>
                            </div>
                            <div className='admin-info-box-button'>
                                <button className='admin-info-box-btn-cancel'>취소</button>
                                <button className='admin-info-box-btn-submit'>게시</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(AdminProductInfo);
