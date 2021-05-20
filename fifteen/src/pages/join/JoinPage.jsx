import React, {Component} from 'react';
import './joinPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {withRouter} from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import {Link} from "react-router-dom";
import {setCookie} from "../../cookies";

class JoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pwd: '',
            pwdRe: '',
            name: '',
            phoneNumber: '',
            email: '',
            token : undefined,
            userSeq : undefined,
            userType: undefined
        }
    }

    join = () => {
        let {id, pwd, name, phoneNumber, email} = this.state;
        let result = axios({
            method: 'POST',
            url: "http://52.79.196.94:3001/auth/signup",
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                id: id,
                passwd: pwd,
                name: name,
                phoneNum: phoneNumber,
                email: email,
            }
        }).then((result) => {
            if (result.status < 400) {
                alert('회원가입이 성공적으로 완료되었습니다.');
                const response = axios( {
                    method : 'POST',
                    url : "http://52.79.196.94:3001/auth/login",
                    headers: {
                        "Content-Type": `application/json`,
                    },
                    data : {
                        id : id,
                        passwd : pwd
                    }
                }).then((response)=>{
                    if(response.status<400){
                        const {history} = this.props;
                        this.state.token = result.data.accessToken;
                        this.state.userSeq = result.data.userSeq;
                        this.state.userType=result.data.userType;
                        setCookie("userSeq", this.state.userSeq);
                        setCookie("accessToken", this.state.token);
                        setCookie("userType",this.state.userType);
                        history.push('/');
                    }
                });
            } else {
                //TODO 회원가입 실패 시 그 이후 로직 추가 필요
            }
        });

    }

    handleChangeId = (e) => {
        this.setState({id: e.target.value})
    }
    handleChangePwd = (e) => {
        this.setState({pwd: e.target.value})
    }
    handleChangePwdRe = (e) => {
        this.setState({pwdRe: e.target.value})
    }
    handleChangeName = (e) => {
        this.setState({name: e.target.value})
    }
    handleChangePhoneNum = (e) => {
        this.setState({phoneNumber: e.target.value})
    }
    handleChangeEmail = (e) => {
        this.setState({email: e.target.value})
    }


    checkPwd = () => {
        const {pwd, pwdRe} = this.state;
        const canJoin = pwd.length > 4 && pwd.length < 16 && _.isEqual(pwd, pwdRe);
        return canJoin;
    }
    render() {
        const {id, pwd, pwdRe, name, phoneNumber, email} = this.state;
        let canJoin = this.checkPwd() && name !== '' && phoneNumber !== '' && email !== '';
        return (
            <div>
                <div className="join_page">
                    <Header/>
                    <div>
                        <div className="join">
                            <div className="header__bar"></div>
                            <div className="join__title">Join</div>
                            <div className="join__box">
                                <div className="join__form__box">
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">아이디
                                            <div className="input__box__alin">
                                                <input type="text" className="input" value={id} onChange={this.handleChangeId}/>
                                                <div>(영문소문자 / 숫자, 4~16)</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">비밀번호
                                            <div className="input__box__alin">
                                                <input type="password" className="input" value={pwd}
                                                       onChange={this.handleChangePwd}/>
                                                <div>(영문대소문자 / 숫자, 4~16)</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">비밀번호 확인<input type="password" className="input"
                                                                                        value={pwdRe}
                                                                                        onChange={this.handleChangePwdRe}/>
                                        </div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">이름<input type="text" className="input" value={name}
                                                                                   onChange={this.handleChangeName}/></div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">휴대전화<input type="text" className="input"
                                                                                     value={phoneNumber}
                                                                                     onChange={this.handleChangePhoneNum}/>
                                        </div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">이메일<input type="text" className="input" value={email}
                                                                                    onChange={this.handleChangeEmail}/></div>
                                    </div>
                                </div>
                                <div className="agree__box">
                                    <input type="checkbox" className="agree__btn"/>
                                    <div>이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</div>
                                </div>
                                <button className={`join__btn ${canJoin ? '' : 'disabled'}`} onClick={this.join}
                                        disabled={!canJoin}>Join
                                </button>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default withRouter(JoinPage);