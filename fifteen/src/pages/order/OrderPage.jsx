import React, {Component} from 'react'
import './orderPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/MyPageSide/MyPageSide';
import {withRouter} from "react-router-dom";

class OrderPage extends Component{
    render(){
        return(
            <div>
                <div className="orderPage">
                    <Header />
                    <div className="orderPage_line" />
                    <div className="orderPage__title">Order</div>
                    <div className="orderPage__main">
                        <MyPageSide />
                        <div>
                            <div className='order'>
                                <div className='order_info_title'>주문 상품 정보</div>
                                <div className="order_info_box">

                                </div>
                                <div className="order_paging">
                                    <button className="order_paging_before"> </button>
                                    <button className="order_paging_this">1</button>
                                    <button className="order_paging_after"> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
export default withRouter(OrderPage);