import React, {Component} from 'react';
import './Adress.css';
import axios from 'axios';
import _ from 'lodash';
import {withRouter, Link, Switch} from "react-router-dom";
import {getCookie} from "../../cookies";
import Modal from 'react-awesome-modal';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryInfo : {},
            newDeliveryInfo : {},
            defaultDelivery : {},
            AddressVisible: false
        };
    }
    _openModal = function() {
        this.setState({
            AddressVisible : true
        });
    }

    _closeModal = function() {
        this.setState({
            AddressVisible : false
        });
    }


    render() {
        return (
            <div className='address'>
                <div className='address-title'>배송지</div>
                <div className='address-box'>
                    <div className='address-check'>
                        <label className='address-check-text'><input type='checkbox' className='address-check-text1'/>기본 배송지</label>
                        <div className='address-check-text2' onClick={() => this._openModal()}>
                            배송지 목록 보기
                            <Modal visible={this.state.AddressVisible} width="700" effect="fadeInDown" onClickAway={() => this._closeModal()}>
                                <div className='address-modal'>
                                    <div className='address-modal-list'>
                                        <div className='address-modal-list-head'>
                                            <div className='address-list-name'>배송지 이름</div>
                                            <div className='address-modal-btnBox'>
                                                <button className='address-modal-btn'>수정</button>
                                                <button className='address-modal-btn'>삭제</button>
                                            </div>
                                        </div>
                                        <div className='address-list-address'>서울특별시 노원구 공릉로 58길 130 서울과기대 생활관 누리학사 222호</div>
                                    </div>
                                    <button className='address-modal-list-plus'>
                                        <div className='address-modal-list-plus-text'>+</div>
                                    </button>
                                    <input className='address-modal-cancel' value='취소' type='button' onClick={() => this._closeModal()}/>
                                </div>
                            </Modal>
                        </div>
                </div>
                    <div className='address-list'>
                        <div className='address-list-name'>배송지 이름</div>
                        <div className='address-list-address'>서울특별시 노원구 공릉로 58길 130 서울과기대 생활관 누리학사 222호</div>
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