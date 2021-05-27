import React, {Component} from 'react';
import './PurchasePage.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../cookies";
import _ from "lodash";

class CartToPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [],
            count: 1,
            productSeq: '',
            keyword : 'field',
            delivery : [],
            selectedDelSeq : '',
            sum : '',
            delPrice : [{'delivery' : 0}]
        }
    }

    getDelivery = async function () {
        let result = await axios({
            method: 'GET',
            url: 'http://52.79.196.94:3001/delivery',
            data: {},
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": getCookie("accessToken")
            },
        })
        this.setState({delivery: result.data});
    }

    plusCount = () => {
        var c = this.state.count;
        this.setState({count: ++c});
    }
    minusCount = () => {
        var c = this.state.count;
        c = c - 1;
        if(c<=0){
            alert('상품 수량은 1개 이상이어야 합니다.');
        }else{
            this.setState({count: --c});
        }
    }

    getCart = async function () {
        let result =await axios ({
            method : 'GET',
            url : `http://52.79.196.94:3001/cart`,
            data: { },
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
        });
        this.setState({products : result.data});
        let sum = _.sumBy(result.data, function(o){return o.count*o.price});
        this.setState({sum : sum});
        let delPrice = _.sortBy(result.data, 'delivery').reverse();
        this.setState({delPrice : delPrice});
        console.log(delPrice);
    };

    renderDelivery = () => {
        const {delivery} = this.state;
        return delivery.map(arr => (
            <div key={arr.delSeq}>
                <label>
                    <div className='purchase-info-box'>
                        <div className='purchase-list'>
                            <div className='address-modal-list-head'>
                                <div className='address-list-name'>{arr.name}</div>
                                <div className='purchase-list-default'>{!(arr.is_default) ? <div> </div> : <div>기본배송지</div>}</div>
                                {!(arr.is_default) ? <input type='radio'  name='address-btn' onChange={()=>this.selectDel(arr.delSeq)}/> : <input type='radio' name='address-btn' onChange={()=>this.selectDel(arr.delSeq)} defaultChecked={true}/>}
                            </div>
                            <div className='address-list-address'>{arr.address}</div>
                        </div>
                    </div>
                </label>
            </div>
        ))
    }

    renderProducts = () => {
        const {products} = this.state;
        return products.map(arr=> (
            <div className='purchase-product-box' key={arr.productSeq}>
                <div className='purchase-product-box-leftBox'>
                    <img className='purchase-product-box-imageBox-img' src={arr.image}/>
                </div>
                <div className='purchase-product-box-rightBox'>
                    <div className='purchase-product-box-rightBox-title'>{arr.title}</div>
                    <div className='purchase-product-box-rightBox-price'>
                        <div className='purchase-product-box-rightBox-count'>
                            <div className='purchase-product-box-rightBox-count-text'>{arr.count}</div>
                        </div>
                        <div className='purchase-product-box-rightBox-price-text'>{arr.count*arr.price} 원</div>
                    </div>
                </div>
            </div>
            ))
    }


    componentDidMount() {
        this.getDelivery();
        this.getCart();
    }

    render() {
        const renderDelivery = this.renderDelivery();
        const renderProducts = this.renderProducts();
        return(
            <div>
                <Header/>
                <div className='purchase'>
                    <div className='purchase-head'>
                        <div className='purchase-head-text'>주문/결제</div>
                    </div>
                    <div className='purchase-orderer'>
                        <div className='purchase-orderer-title'>주문자</div>
                        <div className='purchase-orderer-text'>{getCookie("userName")} 님</div>
                    </div>
                    <div className='purchase-address'>
                        <div className='purchase-address-head'>
                            <div className='purchase-address-title'>배송지 목록</div>
                            <Link to={`/address`}>
                                <button className='purchase-address-manage'>배송지 추가/수정</button>
                            </Link>
                        </div>
                        <div className='address-content'>
                                {renderDelivery}
                        </div>
                    </div>
                    <div className='purchase-product'>
                        <div className='purchase-product-title'>주문상품</div>
                        <div className='address-content'>
                            {renderProducts}
                        </div>
                    </div>
                    <div className='purchase-discount'>
                        <div className='purchase-discount-title'>할인/부가결제</div>
                        <div className='purchase-discount-box'>
                            <div className='purchase-discount-box-title'>
                                <div className='purchase-discount-box-title-box'>
                                    <div className='purchase-discount-box-reserves'>적립금</div>
                                    <div className='purchase-discount-box-title-box-text1'>
                                        (사용 가능
                                        <div className='purchase-discount-box-title-box-text2'>3000</div>
                                        원)
                                    </div>
                                </div>
                            </div>
                            <div className='purchase-discount-box-sub'>
                                <input type='text' className='purchase-discount-box-input'/>
                                <button className='purchase-discount-box-btn'>전액사용</button>
                            </div>
                        </div>
                        <div className='purchase-discount-box'>
                            <div className='purchase-discount-box-reserves'>쿠폰</div>
                            <select>
                                <option className='purchase-discount-box-coupon'>테스트 쿠폰</option>
                            </select>
                        </div>
                        <div className='purchase-discount-price'>
                            <div className='purchase-discount-price-subject'>적용금액</div>
                            <div className='purchase-discount-price-text'></div>
                        </div>
                    </div>
                    <div className='purchase-price'>
                        <div className='purchase-discount-title'>결제 정보</div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>주문상품</div>
                            <div className='purchase-price-box-text'>{this.state.sum} 원</div>
                        </div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>할인/쿠폰</div>
                            <div className='purchase-price-box-text'></div>
                        </div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>배송비</div>
                            <div className='purchase-price-box-text'>{this.state.delPrice[0].delivery} 원</div>
                        </div>
                        <div className='purchase-discount-price'>
                            <div className='purchase-discount-price-subject'>결제금액</div>
                            <div className='purchase-discount-price-text'>{this.state.sum + this.state.delPrice[0].delivery} 원</div>
                        </div>
                    </div>
                    <div className='purchase-payment'>
                        <div className='purchase-discount-title'>결제수단</div>
                        <div className='purchase-payment-box'>
                        </div>
                    </div>
                    <button className='purchase-button'>결제</button>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default CartToPurchase;