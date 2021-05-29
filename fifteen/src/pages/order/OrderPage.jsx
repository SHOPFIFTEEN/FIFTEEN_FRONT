import React, {Component} from 'react'
import './orderPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter} from "react-router-dom";

class OrderPage extends Component{
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
                                        <div className="order-info-box-quantity">수량</div>
                                        <div className="order-info-box-price">금액 </div>
                                        <div className="order-info-box-state">주문처리현황</div>
                                    </div>
                                    <div className="order-info-box-product">
                                        <div className="order-info-box-date"></div>
                                        <div className="order-info-box-info"></div>
                                        <div className="order-info-box-quantity"></div>
                                        <div className="order-info-box-price"></div>
                                        <div className="order-info-box-state"></div>
                                    </div>
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
