import React, {Component} from 'react';
import './Adress.css';
import axios from 'axios';
import _ from 'lodash';
import {withRouter, Link} from "react-router-dom";
import {getCookie} from "../../cookies";


class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryInfo : {},
            newDeliveryInfo : {},
            defaultDelivery : {}
        }
    }

    getDeliveryInfo = async function () {
        let result =await axios ({
            method : 'GET',
            url : `http://52.79.196.94:3001/delivery`,
            data: { },
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
        });
        this.setState({defaultDelivery: _.find(result.data, {'is_default' : '1'})});
    };

    render() {
        return (
            <div className='address'>
                <div className='address-title'>배송지</div>
                <div className='address-box'>
                    <div className='address-check'>
                        <input type='checkbox' className='address-check-text1'/><label>주문자 정보와 동일</label>
                        <input type='checkbox' className='address-check-text2'/><label>새로운 배송지</label>
                    </div>
                    <div className='address-receiver'>
                        <div className='address-subject'>받는 사람</div>
                        <input type='text' className='address-inputBox' value={this.state.defaultDelivery.name}/>
                    </div>
                    <div className='address-address'>
                        <div className='address-subject'>주소</div>
                        <div className='address-address-box'>
                        <input type='text' className='address-address-inputBox' value={this.state.defaultDelivery.address}/>
                        <input type='text' className='address-inputBox' />
                        <input type='text' className='address-inputBox' />
                        </div>
                    </div>
                    <div className='address-number'>
                        <div className='address-subject'>휴대전화</div>
                        <input type='text' className='address-inputBox' value={this.state.defaultDelivery.phoneNum}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Address);