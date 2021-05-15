import React, {Component} from 'react'
import './notice_page.css';
import '../order/orderPage.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import Notice from "../../components/notice/notice";
import {Link, withRouter} from "react-router-dom";



class NoticePage extends Component{
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
                            <div className='order-info'>
                                <div className="order_info_box">
                                    <Notice />
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
export default withRouter(NoticePage);
