import React, {Component} from 'react';
import './profilePage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/MyPageSide/page_sidenav';
import {withRouter} from "react-router-dom";
import ProfileImage from "../../img/profile.svg";
import axios from "axios";
import {getCookie} from "../../cookies";

class ProfilePage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {'productSeq': '1'},
            id : '',
            pwd : '',
            name : '',
            phoneNum : '',
            userSeq : undefined,
            token : undefined
        }
    }

    getUserInfo = async function () {
        this.state.userSeq = getCookie("userSeq");
        let result =await axios ({
            method : 'GET',
            url : `http://52.79.196.94:3001/auth/${this.state.userSeq}`,
            data: { },
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
        });
        this.setState({userInfo : result.data[0]});
        console.log(this.state.userInfo);
    };


    handleChangeId = (e) => {
        this.setState({id: e.target.value})
    }
    handleChangePwd = (e) => {
        this.setState({pwd: e.target.value})
    }
    handleChangeName = (e) => {
        this.setState({name: e.target.value})
    }
    handleChangePhoneNum = (e) => {
        this.setState({phoneNumber: e.target.value})
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render(){
        return(
            <div>
                <Header />
                <div className="profilePage">
                    <div className="profilePage_line" />
                    <div className="profilePage_title">Profile</div>
                    <div className="profilePage_main">
                        <MyPageSide />
                        <div>
                            <div className="profile">
                                <div className="profile_box_welcome">
                                    <img src={ProfileImage} className="profile_box_welcome_image" />
                                    <div className="profile_box_welcome_line"/>
                                    <div className="profile_box_welcome_text">
                                        회원님 저희 쇼핑몰을 이용해주셔서 감사합니다.
                                    </div>
                                </div>
                                <div className="profile_box_info">
                                    <div className="profile_box_info_title">기본정보</div>
                                    <div className="profile_box_info_input">
                                        <div className="profile_box_info_input_box">
                                            <div className="profile_box_info_input_box_name">아이디</div>
                                            <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfo.id} onChange={this.handleChangeId}/>
                                        </div>
                                        <div className="profile_box_info_input_box">
                                            <div className="profile_box_info_input_box_name">비밀번호</div>
                                            <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfo.passwd} onChange={this.handleChangePwd}/>
                                        </div>
                                        <div className="profile_box_info_input_box">
                                            <div className="profile_box_info_input_box_name">비밀번호 확인</div>
                                            <input type="text" className="profile_box_info_input_box_value" />
                                        </div>
                                        <div className="profile_box_info_input_box">
                                            <div className="profile_box_info_input_box_name">이름</div>
                                            <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfo.name} onChange={this.handleChangeName}/>
                                        </div>
                                        <div className="profile_box_info_input_box">
                                            <div className="profile_box_info_input_box_name">주소</div>
                                            <input type="text" className="profile_box_info_input_box_value" />
                                        </div>
                                        <div className="profile_box_info_input_box">
                                            <div className="profile_box_info_input_box_name">휴대전화</div>
                                            <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfo.phoneNum} onChange={this.handleChangePhoneNum}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile_box_button">
                                    <button className="profile_box_confirm">회원정보수정</button>
                                    <button className="profile_box_cancel">취소</button>
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
export default withRouter(ProfilePage);