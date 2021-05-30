import React, {Component} from 'react'
import './orderPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../cookies";

class OrderPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orderList : []
        }
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
                                        <div className="order-info-box-quantity">수량</div>
                                        <div className="order-info-box-price">금액 </div>
                                        <div>배송지</div>
                                        <div className="order-info-box-state">주문처리현황</div>
                                    </div>
                                    {this.state.orderList.map(arr=>(
                                        <div className="order-info-box-product">
                                            <div className="order-info-box-date">{arr.date}</div>
                                            <div className="order-info-box-info">{arr.title}</div>
                                            <div className="order-info-box-quantity">{arr.count}</div>
                                            <div className="order-info-box-price">{arr.price}</div>
                                            <div className='order-info-box-price'>{arr.delivery}</div>
                                            <div className="order-info-box-state">{arr.order_state}</div>
                                        </div>
                                    ))}
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
