import React, {Component} from 'react'
import './PurchasePage.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../cookies";
import Address from "../../components/address/Adress";
import PayImage from "../../img/payment_icon_yellow_medium.png";

class PurchasePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productInfo: {productSeq: 12},
            count: 1,
            productSeq: '',
            keyword : 'field',
            delivery : [],
            selectedDelSeq : ''
        }
    }

    kakaoPay = async () =>{
        let result = await axios({
            method : 'POST',
            url : `https://kapi.kakao.com/v1/payment/ready`,
            headers : {
                'Host' : 'kapi.kakao.com',
                'Authorization': `KakaoAK {e53cf83a206af79d2c72f279b3c12654}`,
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            params : {
                cid : 'TC0ONETIME',
                partner_order_id : 0,
                partner_user_id : 0,
                item_name : `${this.state.productInfo.title}`,
                quantity : this.state.count,
                total_amount : this.state.count*this.state.productInfo.price-this.state.productInfo.delivery,
                tax_free_amount : 0,
                approval_url : `/purchase_done`,
                cancel_url : `/purchase/${this.state.productInfo.productSeq}/${this.state.count}`,
            }
        })
    }

    getProductInfoList = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/product/${this.props.match.params.productSeq}`,
            data: {},
            headers: {
                "Content-Type": 'application/json'
            },
        })
        this.setState({productInfo: result.data[0], count : this.props.match.params.count})
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
        console.log(result.data);
        console.log(this.state.delivery);
    }

    selectDel =(e)=> {
        this.setState({selectedDelSeq : e});
        console.log(this.state.selectedDelSeq);
    }

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


    componentDidMount() {
        this.getProductInfoList();
        this.getDelivery();
    }

    render(){

        const renderDelivery = this.renderDelivery();
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
                        <div className='purchase-product-box'>
                            <div className='purchase-product-box-leftBox'>
                                <img className='purchase-product-box-imageBox-img' src={this.state.productInfo.image}/>
                            </div>
                            <div className='purchase-product-box-rightBox'>
                                <div className='purchase-product-box-rightBox-title'>{this.state.productInfo.title}</div>
                                <div className='purchase-product-box-rightBox-price'>
                                    <div className='purchase-product-box-rightBox-count'>
                                        <button className='purchase-product-box-rightBox-count-btn' onClick={this.minusCount}>-</button>
                                        <div className='purchase-product-box-rightBox-count-text'>{this.state.count}</div>
                                        <button className='purchase-product-box-rightBox-count-btn' onClick={this.plusCount}>+</button>
                                    </div>
                                    <div className='purchase-product-box-rightBox-price-text'>{this.state.count*this.state.productInfo.price} 원</div>
                                </div>
                            </div>
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
                            <div className='purchase-discount-price-text'>-3000원</div>
                        </div>
                    </div>
                    <div className='purchase-price'>
                        <div className='purchase-discount-title'>결제 정보</div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>주문상품</div>
                            <div className='purchase-price-box-text'>{this.state.count*this.state.productInfo.price} 원</div>
                        </div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>할인/쿠폰</div>
                            <div className='purchase-price-box-text'>-3000원</div>
                        </div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>배송비</div>
                            <div className='purchase-price-box-text'>{this.state.productInfo.delivery} 원</div>
                        </div>
                        <div className='purchase-discount-price'>
                            <div className='purchase-discount-price-subject'>결제금액</div>
                            <div className='purchase-discount-price-text'>{this.state.count*this.state.productInfo.price-this.state.productInfo.delivery}</div>
                        </div>
                    </div>
                    <div className='purchase-payment'>
                        <div className='purchase-discount-title'>결제수단</div>
                        <div className='purchase-payment-box'>
                            <img src={PayImage} width="121px" height="50px"/>
                        </div>
                    </div>
                    <button className='purchase-button' onClick={this.kakaoPay}>결제</button>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(PurchasePage)