import React, {Component} from 'react'
import './coupon_page.css'
import Coupon from '../../../src/components/coupon/coupon';
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import MyPage_side from '../../../src/components/MyPage_side/MyPage_side';

class CouponPage extends Component{
    render(){
        return(
            <div>
                <div className="couponPage">
                    <Header />
                    <div className="couponPage_line" />
                    <div className="couponPage_title">Coupon</div>
                    <div className="couponPage_main">
                        <MyPage_side />
                        <Coupon />
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
export default CouponPage;