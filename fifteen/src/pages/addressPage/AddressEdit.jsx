import React, {Component} from 'react'
import '../order/orderPage.css';
import './addressPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter} from "react-router-dom";
import Address from "../../components/address/Adress";

class AddressEdit extends Component{
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
                            <Address />
                            <button className='addressPage-info-btn'>적용</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(AddressEdit);
