import React, {Component} from 'react'
import './couponPage.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/MyPageSide/page_sidenav';
import {withRouter} from "react-router-dom";

class CouponPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    c_seq: 1,
                    c_num: 1,
                    c_content: '환영 쿠폰',
                    c_price: '13000'
                },
                {
                    c_seq: 2,
                    c_num: 2,
                    c_content: '신규가입 쿠폰',
                    c_price: '26000'
                },
                {
                    c_seq: 3,
                    c_num: 3,
                    c_content: '이벤트 쿠폰',
                    c_price: '39000'
                }

            ]
        }
    }
    renderProducts = () => {
        const {products} = this.state;
        const renderItems = products.map(arr =>(
            <div key={arr.productSeq}>
                <div className="couponBox">
                    <div className="couponBoxSeq">{arr.c_num}</div>
                    <div className="couponBoxName">{arr.c_content}</div>
                    <div className="couponBoxPrice">{arr.c_price}</div>
                    <div className="couponBoxTerm"> </div>
                </div>
            </div>
        ));
        return renderItems;
    }
    render(){
        return(
            <div>
                <div className="couponPage">
                    <Header />
                    <div className="couponPage_line" />
                    <div className="couponPage_title">Coupon</div>
                    <div className="couponPage_main">
                        <MyPageSide />
                        <div className="coupon">
                            <div className="couponTitle">쿠폰 목록</div>
                            <div className="couponTheme">
                                <div className="couponThemeSeq">번호</div>
                                <div className="couponThemeName">쿠폰명</div>
                                <div className="couponThemePrice">할인금액</div>
                                <div className="couponThemeTerm">사용가능기간</div>
                            </div>
                            {this.renderProducts}
                            <div className="couponButton">
                                <div className="couponPaging">
                                    <button className="couponPagingBefore">&lt;</button>
                                    <button className="couponPagingThis">1</button>
                                    <button className="couponPagingAfter">&gt;</button>
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
export default withRouter(CouponPage);