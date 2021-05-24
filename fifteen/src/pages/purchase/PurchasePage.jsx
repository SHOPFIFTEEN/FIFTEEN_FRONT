import React, {Component} from 'react'
import './PurchasePage.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {withRouter} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../cookies";
import Address from "../../components/address/Adress";

class PurchasePage extends Component{
    render(){
        return(
            <div>
                <Header/>
                <div className='purchase'>
                    <div className='purchase-head'>
                        <div className='purchase-head-text'>주문/결제</div>
                    </div>
                    <div className='purchase-orderer'>
                        <div className='purchase-orderer-title'>주문자</div>
                        <div className='purchase-orderer-text'>이유진(rooproop1111@naver.com)</div>
                    </div>
                    <div className='purchase-address'>

                    </div>
                    <div className='purchase-product'>
                        <div className='purchase-product-title'>주문상품</div>
                        <div className='purchase-product-box'>
                            <input type='checkbox'/>
                            <div className='purchase-product-box-leftBox'>
                                <img className='purchase-product-box-imageBox-img'/>
                            </div>
                            <div className='purchase-product-box-rightBox'>
                                <div className='purchase-product-box-rightBox-title'>책 제목</div>
                                <div className='purchase-product-box-rightBox-price'>
                                    <div className='purchase-product-box-rightBox-count'>
                                        <button className='purchase-product-box-rightBox-count-btn'>-</button>
                                        <div className='purchase-product-box-rightBox-count-text'>1</div>
                                        <button className='purchase-product-box-rightBox-count-btn'>+</button>
                                    </div>
                                    <div className='purchase-product-box-rightBox-price-text'>13000원</div>
                                </div>
                            </div>
                            <button className='purchase-product-button'>삭제</button>
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
                            <div className='purchase-price-box-text'>80000원</div>
                        </div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>할인/쿠폰</div>
                            <div className='purchase-price-box-text'>-3000원</div>
                        </div>
                        <div className='purchase-price-box'>
                            <div className='purchase-price-box-subject'>배송비</div>
                            <div className='purchase-price-box-text'>+2500원</div>
                        </div>
                        <div className='purchase-discount-price'>
                            <div className='purchase-discount-price-subject'>결제금액</div>
                            <div className='purchase-discount-price-text'>79500원</div>
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
        )
    }
}
export default withRouter(PurchasePage)