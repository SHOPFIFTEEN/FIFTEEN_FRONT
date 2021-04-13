import React, {Component} from 'react';
import './join.css';
import { Link} from "react-router-dom";

class Join extends Component {
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
                                    <input type="text" className="input"/>
                                    <div>(영문소문자 / 숫자, 4~16)</div>
                                </div>
                            </div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">비밀번호
                                <div className="input__box__alin">
                                    <input type="password" className="input"/>
                                    <div>(영문대소문자 / 숫자, 4~16)</div>
                                </div>
                            </div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">비밀번호 확인<input type="password" className="input"/></div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">이름<input type="text" className="input"/></div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">휴대전화<input type="text" className="input"/></div>
                            </div>
                            <div className="input__box">
                                <span>*</span><div className="input__box__just">이메일<input type="text" className="input"/></div>
                            </div>
                        </div>
                        <div className="agree__box">
                            <input type="checkbox" className="agree__btn"/>
                            <div>이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</div>
                        </div>
                        <Link to='/login'><div className="join__btn">Join</div></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Join;