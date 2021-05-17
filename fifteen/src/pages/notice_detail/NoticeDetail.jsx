import React, {Component} from 'react'
import '../notice/notice_page.css';
import '../order/orderPage.css';
import './NoticeDetail.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {Link, withRouter} from "react-router-dom";



class NoticeDetail extends Component{
    render(){
        return(
            <div>
                <Header />
                <div className="orderPage">
                    <div className="orderPage_line" />
                    <div className="orderPage__title">Notice</div>
                    <div className="orderPage__main">

                        <div className="noticePage-nav">
                            <div className="noticePage-nav-side">
                                <Link to='/notice'><div className="noticePage-nav-text">공지</div></Link>
                                <Link to='/event'><div className="noticePage-nav-text">이벤트</div></Link>
                            </div>
                        </div>
                        <div>
                            <div className='order_info_title'>공지사항</div>
                            <div className='notice-info'>
                                <div className='notice_info_box'>
                                    <div className='notice-info-box-titleBox'>
                                        <div className='notice-info-box-titleBox-title'>제목</div>
                                        <div className='notice-info-box-titleBox-text'>구매 전 필독 공지사항</div>
                                    </div>
                                    <div className='notice-info-box-subBox'>
                                        <div className='notice-info-box-subBox-date'>
                                            <div className='notice-info-box-subBox-title'>작성일</div>
                                            <div className='notice-info-box-subBox-text'>2021-05-15</div>
                                        </div>
                                        <div className='notice-info-box-subBox-views'>
                                            <div className='notice-info-box-subBox-title'>조회수</div>
                                            <div className='notice-info-box-subBox-text'> </div>
                                        </div>
                                    </div>
                                    <div className='notice-info-box-main'>

                                    </div>
                                    <button className='notice-info-box-btn'>목록으로</button>
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
export default withRouter(NoticeDetail);
