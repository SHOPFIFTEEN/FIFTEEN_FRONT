import React, {Component} from 'react'
import './myPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/MyPageSide/MyPageSide';
import {withRouter} from "react-router-dom";

class MyPage extends Component {
    render(){
        return(
            <div>
                <div className='My_Page'>
                    <Header />
                    <div className='My_Page_line'/>
                    <div className='My_page__title'>My page</div>
                    <div className='My_page__main'>
                        <MyPageSide/>
                            <div className='my'>
                                <div className='my__box'>
                                    <div className='my__box_info'>
                                        <div className='my__box__info__left'>
                                            <div className='my__box__info__box'>
                                                <div className='my__box__info__box__text'>총 주문</div>
                                                <div className='my__box__info__box__cnt'>0</div>
                                            </div>
                                            <div className='my__box__info__box'>
                                                <div className='my__box__info__box__text'>쿠폰</div>
                                                <div className='my__box__info__box__cnt'>0</div>
                                            </div>
                                        </div>
                                        <div className='my_box__info__bar'/>
                                        <div className='my__box__info__right'>
                                            <div className='my__box__info__box'>
                                                <div className='my__box__info__box__text'>총 적립금</div>
                                                <div className='my__box__info__box__cnt'>0</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='my__box_order'>
                                        <div className='my__box_order__title'>나의 주문처리현황</div>
                                        <div className='my__box_order_stage'>
                                            <div className='my__box_order_stage__box'>
                                                <div className='my__box_order_stage__box__text'>입금전</div>
                                                <div className='my__box_order_stage__box__cnt'>0</div>
                                            </div>
                                            <div className='my_box__stage__bar'/>
                                            <div className='my__box_order_stage__box'>
                                                <div className='my__box_order_stage__box__text'>배송준비중</div>
                                                <div className='my__box_order_stage__box__cnt'>0</div>
                                            </div>
                                            <div className='my_box__stage__bar'/>
                                            <div className='my__box_order_stage__box'>
                                                <div className='my__box_order_stage__box__text'>배송중</div>
                                                <div className='my__box_order_stage__box__cnt'>0</div>
                                            </div>
                                            <div className='my_box__stage__bar'/>
                                            <div className='my__box_order_stage__box'>
                                                <div className='my__box_order_stage__box__text'>배송완료</div>
                                                <div className='my__box_order_stage__box__cnt'>0</div>
                                            </div>
                                        </div>
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

export default withRouter(MyPage);