import React, {Component} from 'react'
import '../order/orderPage.css';
import './addressPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {Link, withRouter} from "react-router-dom";
import Address from "../../components/address/Adress";

class AddressPage extends Component{
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
                            <div className='address-title'>배송지 목록</div>
                            <div className='addressPage-info-box'>
                                <div className='addressPage-list'>
                                    <div className='address-modal-list-head'>
                                        <div className='address-list-name'>배송지 이름</div>
                                        <div className='address-modal-btnBox'>
                                            <Link to='/address_edit'><button className='address-modal-btn'>수정</button></Link>
                                            <button className='address-modal-btn'>삭제</button>
                                        </div>
                                    </div>
                                    <div className='address-list-address'>서울특별시 노원구 공릉로 58길 130 서울과기대 생활관 누리학사 222호</div>
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
export default withRouter(AddressPage);
