import React, {Component} from 'react'
import '../order/orderPage.css';
import './addressPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {Link, withRouter} from "react-router-dom";
import Address from "../../components/address/Adress";
import axios from "axios";
import {getCookie, setCookie} from "../../cookies";

class AddressPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: []
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

    deleteDelivery = async function (e) {
        let result = await axios({
            method: 'DELETE',
            url: `http://52.79.196.94:3001/delivery/ki/${e}`,
            data: {},
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": getCookie("accessToken")
            },
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.delivery!==this.state.delivery){
            this.getDelivery();
        }
    }

    renderDelivery = () => {
        const {delivery} = this.state;
        return delivery.map(arr => (
            <div key={arr.delSeq}>
                <div className='addressPage-info-box'>
                    <div className='addressPage-list'>
                        <div className='address-modal-list-head'>
                            <div className='address-list-name'>{arr.name}</div>
                            <div className='address-modal-btnBox'>
                                <Link to={`/address_edit/${arr.delSeq}`}>
                                    <button className='address-modal-btn'>수정</button>
                                </Link>
                                <button className='address-modal-btn' onClick={()=>this.deleteDelivery(arr.delSeq)}>삭제</button>
                            </div>
                        </div>
                        <div className='address-list-address'>{arr.address}</div>
                        <div className='address-list-default'>{!(arr.is_default) ? <div></div> : <div>기본배송지</div>}</div>
                    </div>
                </div>
            </div>
        ))
    }

    componentDidMount() {
        this.getDelivery();
    }

    render() {

        const renderDelivery = this.renderDelivery();

        return (
            <div>
                <Header/>
                <div className="addressPage">
                    <div className="orderPage_line"/>
                    <div className="orderPage__title">Address</div>
                    <div className="addressPage-main">
                        <PageSideNav/>
                        <div className='addressPage-info'>
                            <div className='address-title'>배송지 목록</div>
                            {renderDelivery}
                            <div className='address-addBox'>
                                <Link to='/address_post'><div className='address-add'>+</div></Link>
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
