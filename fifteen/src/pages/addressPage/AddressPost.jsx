import React, {Component} from 'react'
import '../order/orderPage.css';
import './addressPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter} from "react-router-dom";

class AddressPost extends Component{
    render(){
        return(
            <div>
                <Header />
                <div className="addressPage">
                    <div className="orderPage_line" />
                    <div className="orderPage__title">Address</div>
                    <div className="addressPage-main">
                        <PageSideNav />
                        <div className='addressPage-info'>
                            <div className='address-title'>배송지 추가</div>
                            <div className='addressPost-info-box'>
                                <div className='address-name'>
                                    <div className='address-subject'>배송지 이름</div>
                                    <input type='text' className='address-inputBox'/>
                                </div>
                                <div className='address-receiver'>
                                    <div className='address-subject'>받는 사람</div>
                                    <input type='text' className='address-inputBox'/>
                                </div>
                                <div className='address-address'>
                                    <div className='address-subject'>주소</div>
                                    <div className='address-address-box'>
                                        <input type='text' className='address-address-inputBox'/>
                                        <input type='text' className='address-inputBox' />
                                        <input type='text' className='address-inputBox' />
                                    </div>
                                </div>
                                <div className='address-number'>
                                    <div className='address-subject'>휴대전화</div>
                                    <input type='text' className='address-inputBox'/>
                                </div>
                            </div>
                            <button className='addressPage-info-btn'>등록</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(AddressPost);
