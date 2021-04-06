import React, {Component} from 'react'
import './order_page.css'
import Order from '../../components/order/order'
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import MyPage_side from '../../../src/components/MyPage_side/MyPage_side';

class OrderPage extends Component{
    render(){
        return(
            <div>
                <div className="orderPage">
                    <div className="orderPage__title">Order</div>
                    <Header />
                    <div className="orderPage__main">
                        <MyPage_side />
                        <Order/>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
export default OrderPage;