import React, {Component} from 'react'
import './coupon.css'

class Coupon extends Component{
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
    render(){
        return(
            <div className="coupon">
                <div className="couponTitle">쿠폰 목록</div>
                <div className="couponTheme">
                    <div className="couponThemeSeq">번호</div>
                    <div className="couponThemeName">쿠폰명</div>
                    <div className="couponThemePrice">할인금액</div>
                    <div className="couponThemeTerm">사용가능기간</div>
                </div>
                {this.state.products.map(arr =>(
                    <div key={arr.productSeq}>
                        <div className="couponBox">
                            <div className="couponBoxSeq">{arr.c_num}</div>
                            <div className="couponBoxName">{arr.c_content}</div>
                            <div className="couponBoxPrice">{arr.c_price}</div>
                            <div className="couponBoxTerm"> </div>
                        </div>
                    </div>
                ))}
                <div className="couponButton">
                    <div className="couponPaging">
                        <button className="couponPagingBefore"> </button>
                        <button className="couponPagingThis">1</button>
                        <button className="couponPagingAfter"> </button>
                    </div>
                </div>
            </div>
        )

    }
}
export default Coupon;