import React, {Component} from 'react';
import './join.css';
import { Link} from "react-router-dom";
import axios from 'axios';

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            pw : '',
            name : '',
            phone_number : '',
            email : '',
        }
    }

    join = function() {
        let {id,pw,name,phone_number,email} = this.state;
        let result = axios( {
            method : 'POST',
            url : "http://3.34.126.33:8080/user_info/insert_user",
            headers: {
                "Content-Type": `application/json`,
            },
            data : {
                id : id,
                passwd : pw,
                name : name,
                phone_number : phone_number,
                email : email,
            }
        });

    }

    _changeId = (e) => {this.setState({id : e.target.value})}
    _changePw = (e) => {this.setState({pw : e.target.value})}
    _changeName = (e) => {this.setState({name : e.target.value})}
    _changePhoneNum = (e) => {this.setState({phone_number : e.target.value})}
    _changeEmail = (e) => {this.setState({email : e.target.value})}

    render() {
        return (
            <div>
                <div className="join">
                    <div className="header__bar"></div>
                    <div className="join__title">Join</div>
                    <div className="join__box">
                        <div className="join__form__box">
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">아이디
                                <div className="input__box__alin">
                                    <input type="text" className="input" onChange={()=>this._changeId()}/>
                                    <div>(영문소문자 / 숫자, 4~16)</div>
                                </div>
                            </div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">비밀번호
                                <div className="input__box__alin">
                                    <input type="password" className="input" onChange={()=>this._changePw()}/>
                                    <div>(영문대소문자 / 숫자, 4~16)</div>
                                </div>
                            </div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">비밀번호 확인<input type="password" className="input"/></div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">이름<input type="text" className="input" onChange={()=>this._changeName()}/></div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">휴대전화<input type="text" className="input" onChange={()=>this._changePhoneNum()}/></div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">이메일<input type="text" className="input" onChange={()=>this._changeEmail()}/></div>
                            </div>
                        </div>
                        <div className="agree__box">
                            <input type="checkbox" className="agree__btn"/>
                            <div>이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</div>
                        </div>
                        <Link to='/login'><div className="join__btn" onClick={()=> this.join()}>Join</div></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Join;