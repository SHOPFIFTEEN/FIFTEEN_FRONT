import React, {Component} from 'react';
import '../../pages/addressPage/Adress.css';
import axios from 'axios';
import _ from 'lodash';
import {withRouter, Link, Switch} from "react-router-dom";
import {getCookie} from "../../cookies";
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-awesome-modal';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: [],
            name : '',
            address : '',
            address_detail : '',
            address_mail : '',
            phoneNum : '',
            is_default : ''
        }
    }

    getDelivery = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/delivery/${this.props.match.params.delSeq}`,
            data: {},
            headers: {
                "Content-Type": 'application/json',
            },
        })
        this.setState({delivery: result.data[0]});
        this.setState({
            name : result.data[0].name,
            address : result.data[0].address,
            address_detail: result.data[0].address_detail,
            address_mail: result.data[0].address_mail,
            phoneNum : result.data[0].phoneNum,
            is_default: result.data[0].is_default
        })
    }

    reDelivery = async function () {
        let result = await axios({
            method: 'POST',
            url: `http://52.79.196.94:3001/delivery/re/${this.props.match.params.delSeq}`,
            data: {
                name : this.state.name,
                address : this.state.address,
                address_detail: this.state.address_detail,
                address_mail: this.state.address_mail,
                phoneNum: this.state.phoneNum,
                is_default: this.state.is_default
            },
            headers: {
                "Content-Type": 'application/json',
                "x-access-token" : getCookie("accessToken")
            },
        })
    }

    handleChangeName = (e) => {
        this.setState({name: e.target.value})
    }
    handleChangeAddress = (e) => {
        this.setState({address: e.target.value})
    }
    handleChangeAddressD= (e) => {
        this.setState({address_detail: e.target.value})
    }
    handleChangeAddressM = (e) => {
        this.setState({address_mail: e.target.value})
    }
    handleChangePhoneNum = (e) => {
        this.setState({phoneNum: e.target.value})
    }
    handleChangeDefault = (e) => {
        this.setState({is_default: e.target.checked})
    }


    componentDidMount() {
        this.getDelivery();
    }

    render() {
        return (
            <div className='address'>
                <div className='address-title'>배송지</div>
                <div className='address-box'>
                    <div className='address-check'>
                        <label className='address-check-text'><input type='checkbox' className='address-check-text1' checked={this.state.is_default} onChange={this.handleChangeDefault}/>기본 배송지</label>
                </div>
                    <div className='address-receiver'>
                        <div className='address-subject'>배송지 이름</div>
                        <input type='text' className='address-address-inputBox' value={this.state.name} onChange={this.handleChangeName}/>
                    </div>
                    <div className='address-address'>
                        <div className='address-subject'>주소</div>
                        <div className='address-address-box'>
                        <input type='text' className='address-address-inputBox' value={this.state.address} onChange={this.handleChangeAddress}/>
                        <input type='text' className='address-inputBox' value={this.state.address_detail} onChange={this.handleChangeAddressD}/>
                        <input type='text' className='address-inputBox' value={this.state.address_mail} onChange={this.handleChangeAddressM}/>
                        </div>
                    </div>
                    <div className='address-number'>
                        <div className='address-subject'>휴대전화</div>
                        <input type='text' className='address-inputBox' value={this.state.phoneNum} onChange={this.handleChangePhoneNum}/>
                    </div>
                    <button className='addressPage-info-btn' onClick={this.reDelivery}>적용</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Address);