import React, {Component} from 'react';
import './joinPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {withRouter} from "react-router-dom";
import axios from "axios";
import _ from "lodash";

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
        }
    }

    join = () => {
        let {id, pwd, name, phoneNumber, email} = this.state;
        let result = axios({
            method: 'POST',
            url: "http://3.34.126.33:8080/user_info/insert_user",
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                id: id,
                passwd: pwd,
                name: name,
                phone_number: phoneNumber,
                email: email,
            }
        }).then((response) => {
            if (response.isSuccess === true) {
                const {history} = this.props;
                alert('회원가입이 성공적으로 완료되었습니다.');
                history.push('/login');
                //TODO 이와 같은 회원가입 성공 이후 로직 추가 필요.
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