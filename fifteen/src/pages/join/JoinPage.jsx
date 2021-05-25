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
            isValidID: undefined,
            isValidEmail: undefined,
            isValidPwd : undefined,
            passwordCheck: undefined,
            isMatchPassword:undefined,
            onClick: undefined,
            onClick2: undefined,
            checked : false,
            token : undefined,
            userSeq : undefined,
            userType: undefined
        }
    }

    join = () => {
        let {id, pwd, name, phoneNumber, email,isValidID,isValidEmail,isValidPwd,isMatchPassword,checked} = this.state;
        if(isValidID===false){
            alert("아이디 중복확인을 해주세요")
        }else if(isValidPwd===false){
            alert("올바르지 않은 비밀번호입니다")
        }else if(isMatchPassword===false){
            alert("비밀번호가 일치하지 않습니다")
        }else if(isValidEmail===false){
            alert("이메일 중복확인을 해주세요")
        }else if(!id || !pwd || !name || !phoneNumber || !email){
            alert("필수 항목을 작성해주세요")
        }else if(checked===false) {
            alert("이용약관에 동의해주세요")
        }else {
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
                            this.state.userName=result.data.name;
                            setCookie("userSeq", this.state.userSeq);
                            setCookie("accessToken", this.state.token);
                            setCookie("userType",this.state.userType);
                            setCookie("userName",this.state.userName);
                            history.push('/');
                        }
                    });
                } else {
                    //TODO 회원가입 실패 시 그 이후 로직 추가 필요
                }
            });
        }
    }

    checkOverlapID = () => {
        let {id} = this.state;
        let result = axios({
            method: 'POST',
            url: "http://52.79.196.94:3001/auth/overlap_id",
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                id: id
            }
        }).then((result) => {
            if(result.data.tf ===true){
                console.log(result.data.tf);
                this.setState({isValidID: true})
                this.setState({onClick: true})
            }else{
                console.log(result.data.tf);
                this.setState({isValidID: false})
                this.setState({onClick: true})
                document.getElementById("id_box").value='';
            }
        })

    }
    checkOverlapEmail = () => {
        let {email} = this.state;
        let result = axios({
            method: 'POST',
            url: "http://52.79.196.94:3001/auth/overlap_email",
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                email: email
            }
        }).then((response) => {
            if(response.data.tf ===true){
                this.setState({isValidEmail: true})
                this.setState({onClick2: true})
            }else{
                this.setState({isValidEmail: false})
                this.setState({onClick2: true})

            }
        })

    }

    isPassword(asValue) {
        let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
        return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
    }

    checkValidPasswd = () => {
        let timer;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            if (!this.isPassword(this.state.pwd)) {
                this.setState({ isValidPwd: false });
            } else {
                this.setState({ isValidPwd: true });
            }
        }, 500);
    };

    createPwd = e => {
        // console.log("사인업 이메일: ", e.target.value);
        const __pwd = e.target.value;
        this.setState({ pwd: __pwd });
        this.checkValidPasswd();    //함수 실행
    };
    checkMatchPassword = () => {
        let timer;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            if (this.state.pwd === this.state.passwordCheck) {
                this.setState({ isMatchPassword: true });
            } else {
                this.setState({ isMatchPassword: false });
            }
        }, 500);
    };
    repeatPassword = e => {
        // console.log("사인업 이메일: ", e.target.value);
        const __repwd = e.target.value;
        this.setState({ passwordCheck: __repwd });
        this.checkMatchPassword();    //함수 실행
    };

    isEmail(asValue) {
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
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
    handleChecked = (e) => {
        this.setState({checked : e.target.checked})
    }
    render() {
        const {id, pwd, pwdRe, name, phoneNumber, email} = this.state;
        return (
            <div>
                <div className="join_page">
                    <Header/>
                    <div>
                        <div className="join">
                            <div className="header__bar" />
                            <div className="join__title">Join</div>
                            <div className="join__box">
                                <div className="join__form__box">
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">아이디
                                            <div className="input__box__alin">
                                                <input type="text" className="input" id="id_box" value={id} onChange={this.handleChangeId} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='input__check'>
                                        <button className="overlap__btn" onClick={this.checkOverlapID}>중복 확인</button>
                                        {(this.state.onClick) ? ((this.state.isValidID) ? <div style={{ color: "blue" }}>사용가능한 ID입니다.</div> : <div style={{ color: "red" }}>이미 존재하는 ID입니다.</div>) : null}
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">비밀번호
                                            <div className="input__box__alin">
                                                <input type="password" className="input" value={this.state.pwd}
                                                       onChange={e => this.createPwd(e)} required/>
                                                    {this.state.pwd ? (
                                                    this.state.isValidPwd ? (
                                                        <div style={{ color: "blue" }}>(8 ~ 10자 영문, 숫자 조합) 사용가능한 비밀번호 입니다.</div>
                                                    ) : (
                                                        <div style={{ color: "red" }}>(8 ~ 10자 영문, 숫자 조합) 유효하지 않은 비밀번호 입니다.</div>
                                                    )
                                                    ) : (<div>(8 ~ 10자 영문, 숫자 조합)</div>)}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">비밀번호 확인
                                            <div className="input__box__alin">
                                                <input type="password" className="input"
                                                                                        value={this.state.passwordCheck}
                                                                                        onChange={e => this.repeatPassword(e)} required/>
                                                {this.state.passwordCheck ? (
                                                    this.state.isMatchPassword ? (
                                                        <div style={{ color: "blue" }}>비밀번호가 일치합니다</div>
                                                    ) : (
                                                        <div style={{ color: "red" }}>
                                                            비밀번호가 일치하지 않습니다.</div>
                                                    )
                                                ) : null}
                                        </div>
                                        </div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">이름<input type="text" className="input" value={name}
                                                                                   onChange={this.handleChangeName} required/></div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">휴대전화<input type="text" className="input"
                                                                                     value={phoneNumber}
                                                                                     onChange={this.handleChangePhoneNum} required/>
                                        </div>
                                    </div>
                                    <div className="input__box">
                                        <span>*</span>
                                        <div className="input__box__just">이메일<input type="text" className="input" value={email}
                                                                                    onChange={this.handleChangeEmail} required/></div>
                                    </div>
                                    <div className='input__check2'>
                                        <button className="overlap__btn" onClick={this.checkOverlapEmail}>중복 확인</button>
                                        {(this.state.onClick2) ? ((this.state.isValidEmail) ? <div style={{ color: "blue" }}>사용가능한 Email입니다.</div> : <div style={{ color: "red" }}>이미 존재하는 Email입니다.</div>) : null}
                                    </div>
                                </div>
                                <div className="agree__box">
                                    <input type="checkbox" className="agree__btn" checked={this.state.checked} onChange={this.handleChecked} required/>
                                    <div>이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</div>
                                </div>
                                <button className={`join__btn`} onClick={this.join}>Join</button>
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