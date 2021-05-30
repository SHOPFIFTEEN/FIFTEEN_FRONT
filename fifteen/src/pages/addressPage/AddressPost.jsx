import React, {Component} from 'react'
import '../order/orderPage.css';
import './addressPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter, Link} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../cookies";
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-awesome-modal';


class AddressPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            delivery: [],
            name : null,
            address : null,
            address_detail : null,
            address_mail : null,
            phoneNum : null,
            is_default : false,
            visible : false,
            is_possible : 0,
            is_clicked : 0
        }
    }

    addDelivery = () =>{
        let isDefault = 0;
        if(this.state.is_default){
            isDefault=1;
        }else{
            isDefault=0;
        }
        let result = axios({
            method: 'POST',
            url: `http://52.79.196.94:3001/delivery/add`,
            data: {
                name : this.state.name,
                address : this.state.address,
                address_detail: this.state.address_detail,
                address_mail: this.state.address_mail,
                phoneNum: this.state.phoneNum,
                is_default: isDefault
            },
            headers: {
                "Content-Type": 'application/json',
                "x-access-token" : getCookie("accessToken")
            }
        }).then((result) => {
            if(result.status<400){
                const {history} = this.props;
                history.push('/address');
            }else{
                alert('모든 칸을 입력해주세요');
            }
        });
    }

    initiate = (comp) => {
        window.daum.Postcode.load(()=> {
            const Postcode = new window.daum.Postcode({
            })
            Postcode.embed(this.wrap, { autoClose: this.props.autoClose });
        })
    }

    handleComplete = (data) => {
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = '';

        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }

        this.setState({
            address_mail : data.zonecode,
            address : roadAddr,
            address_detail : '',
            is_clicked : 1,
            visible : false
        })
    }

    closeModal= () => {
        this.setState({
            visible : false
        })
    }

    openModal = () => {
        this.setState({
            visible : true
        })
    }

    handleClose = (state) => {
        if(state==='COMPLETE_CLOSE'){
            this.setState({
                visible : false
            })
        }
    }

    setPossible =()=> {
        const {name, address, address_detail, address_mail, phoneNum, is_clicked} = this.state;
        if(name!=='' && address!=='' && address_detail !=='' && address_mail!== '' && phoneNum!==''){
            if(is_clicked===1){
                var phone = phoneNum.split("-").join("");
                const checkNum = Number.isInteger(Number(phone));
                const checkStartNum = phone.slice(0,3) === '010';
                const checkLength = phone.slice(3).length === 7 || phone.slice(3).length === 8;
                if(checkNum && checkStartNum && checkLength){
                    this.setState({is_possible : 1});
                    const {history} = this.props;
                    history.push('/address');
                    this.addDelivery();
                }else{
                    alert('정확한 핸드폰 번호를 입력하여주세요.')
                }
            }else{
                alert('배송지 입력 버튼으로 입력해주세요.');
            }
        }else{
            alert('필수 정보를 모두 입력해주세요.');
        }
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
                                <div className='address-check'>
                                    <label className='address-check-text'><input type='checkbox' className='address-check-text1' value={this.state.is_default} onChange={this.handleChangeDefault}/>기본 배송지</label>
                                </div>
                                <div className='address-name'>
                                    <div className='address-subject'>배송지 이름</div>
                                    <input type='text' className='address-address-inputBox' value={this.state.name} onChange={this.handleChangeName}/>
                                    <div className='daum-address' onClick={this.openModal}>배송지 입력</div>
                                    <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                        <DaumPostcode onComplete={this.handleComplete} onClose={this.handleClose} autoClose={true}/>
                                    </Modal>
                                </div>
                                <div className='address-receiver'>
                                    <div className='address-subject'>받는 사람</div>
                                    <input type='text' className='address-inputBox'/>
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
                            </div>
                                <button className='addressPage-info-btn' onClick={this.setPossible}>등록</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(AddressPost);
