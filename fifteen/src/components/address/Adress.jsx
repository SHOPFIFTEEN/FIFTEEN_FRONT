import React, {Component} from 'react';
import './Adress.css';
import axios from 'axios';
import _ from 'lodash';
import {withRouter, Link} from "react-router-dom";


class Address extends Component {
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
                        <input type='text' className='address-inputBox' />
                    </div>
                    <div className='address-address'>
                        <div className='address-subject'>주소</div>
                        <div className='address-address-box'>
                        <input type='text' className='address-address-inputBox' />
                        <input type='text' className='address-inputBox' />
                        <input type='text' className='address-inputBox' />
                        </div>
                    </div>
                    <div className='address-number'>
                        <div className='address-subject'>휴대전화</div>
                        <input type='text' className='address-inputBox' />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Address);