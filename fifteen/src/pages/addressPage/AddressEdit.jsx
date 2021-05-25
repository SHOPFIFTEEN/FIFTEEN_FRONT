import React, {Component} from 'react'
import '../order/orderPage.css';
import './addressPage.css';
import './Adress.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import PageSideNav from '../../components/page_nav/page_sidenav';
import {withRouter, Link} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../cookies";
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-awesome-modal';

class AddressEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            delivery: [],
            name : '',
            address : '',
            address_detail : '',
            address_mail : '',
            phoneNum : '',
            is_default : '',
            visible : false
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

    reDelivery = ()=> {
        let isDefault = 0;
        if(this.state.is_default){
            isDefault=1;
        }else{
            isDefault=0;
        }
        let result = axios({
            method: 'POST',
            url: `http://52.79.196.94:3001/delivery/re/${this.props.match.params.delSeq}`,
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
            },
        })
        console.log(this.state.name);
        console.log(this.state.is_default);
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
            address_detail : ''
        })
    }

    handleClose = (state) => {
        if(state==='COMPLETE_CLOSE'){
            this.setState({
                visible : false
            })
        }
    }

    handleChangeName = (e) => {
        this.setState({name: e.target.value})
    }
    handleChangeAddressD= (e) => {
        this.setState({address_detail: e.target.value})
    }
    handleChangePhoneNum = (e) => {
        this.setState({phoneNum: e.target.value})
    }
    handleChangeDefault = (e) => {
        this.setState({is_default: e.target.checked})
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


    componentDidMount() {
        this.getDelivery();
    }

    render(){
        return(
            <div>
                <Header />
                <div className="addressPage">
                    <div className="orderPage_line" />
                    <div className="orderPage__title">Address</div>
                    <div className="addressPage-main">
                        <PageSideNav/>
                        <div className='addressPage-info'>
                            <div className='address'>
                                <div className='address-title'>배송지</div>
                                <div className='address-box'>
                                    <div className='address-check'>
                                        <label className='address-check-text'><input type='checkbox' className='address-check-text1' checked={this.state.is_default} onChange={this.handleChangeDefault}/>기본 배송지</label>
                                    </div>
                                    <div className='address-receiver'>
                                        <div className='address-subject'>배송지 이름</div>
                                        <input type='text' className='address-address-inputBox' value={this.state.name} onChange={this.handleChangeName}/>
                                        <div className='daum-address' onClick={this.openModal}>배송지 입력</div>
                                        <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                            <DaumPostcode onComplete={this.handleComplete} onClose={this.handleClose} autoClose={true}/>
                                        </Modal>
                                    </div>
                                    <div className='address-address'>
                                        <div className='address-subject'>주소</div>
                                        <div className='address-address-box'>
                                            <input type='text' className='address-address-inputBox' value={this.state.address}/>
                                            <input type='text' className='address-inputBox' value={this.state.address_detail} onChange={this.handleChangeAddressD}/>
                                            <input type='text' className='address-address-inputBox' value={this.state.address_mail}/>
                                        </div>
                                    </div>
                                    <div className='address-number'>
                                        <div className='address-subject'>휴대전화</div>
                                        <input type='text' className='address-inputBox' value={this.state.phoneNum} onChange={this.handleChangePhoneNum}/>
                                    </div>
                                    <Link to={`/address`}>
                                        <button className='addressPage-info-btn' onClick={this.reDelivery}>적용</button>
                                    </Link>
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
export default withRouter(AddressEdit);
