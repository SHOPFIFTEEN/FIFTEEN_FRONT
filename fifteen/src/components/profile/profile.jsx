import React, {Component} from 'react'
import './profile.css';
import axios from 'axios';
import ProfileImage from '../../img/profile.svg';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfoArr: [{'productSeq': '1'}]
        }
    }

    getUserInfoList = async function () {
        let result =await axios ({
            method : 'GET',
            url : 'http://3.34.126.33:8080/user_info/select_all',
            data: { },
            headers : {
                'Access-Control-Allow-Origin' : '*',
                "Content-Type" : 'application/json'
            },
        });
        this.setState({userInfoArr : result.data});
    };

    componentDidMount() {
        this.getUserInfoList();
    }

    render(){
        return(
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
                                <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfoArr[0].id}/>
                            </div>
                            <div className="profile_box_info_input_box">
                                <div className="profile_box_info_input_box_name">비밀번호</div>
                                <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfoArr[0].passwd} />
                            </div>
                            <div className="profile_box_info_input_box">
                                <div className="profile_box_info_input_box_name">비밀번호 확인</div>
                                <input type="text" className="profile_box_info_input_box_value" />
                            </div>
                            <div className="profile_box_info_input_box">
                                <div className="profile_box_info_input_box_name">이름</div>
                                <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfoArr[0].name} />
                            </div>
                            <div className="profile_box_info_input_box">
                                <div className="profile_box_info_input_box_name">주소</div>
                                <input type="text" className="profile_box_info_input_box_value" />
                            </div>
                            <div className="profile_box_info_input_box">
                                <div className="profile_box_info_input_box_name">휴대전화</div>
                                <input type="text" className="profile_box_info_input_box_value" value={this.state.userInfoArr[0].phoneNum}/>
                            </div>
                        </div>
                    </div>
                    <div className="profile_box_button">
                        <button className="profile_box_confirm">회원정보수정</button>
                        <button className="profile_box_cancel">취소</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;