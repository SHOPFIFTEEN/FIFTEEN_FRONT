import React, {Component} from 'react';
import './loginPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {getCookie, setCookie} from "../../cookies";

class Login_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            password : '',
            token : undefined,
            userSeq : undefined,
            userType: undefined,
            userName: undefined
        }
    }

    onKeyPress=(e)=>{
        if(e.key==='Enter'){
            this.login();
        }
    }


    handleGoJoin = (e) => {
        const {history} = this.props;
        history.push('/join');
    }
    handleChangeId = (e) => {
        this.setState({
            id : e.target.value
        })
    }

    handleChangePwd = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    login = () => {
        const id = this.state.id;
        const pw = this.state.password;
        const result = axios( {
            method : 'POST',
            url : "http://52.79.196.94:3001/auth/login",
            headers: {
                "Content-Type": `application/json`,
            },
            data : {
                id : id,
                passwd : pw
            }
        }).then((result=>{
            console.log(result.data.status)
            if(result.data.status===0){
                alert('아이디와 비밀번호를 다시 확인해주세요');
                document.getElementById("login_id_box").value='';
                document.getElementById("login_pw_box").value='';
            }else{
                const {history} = this.props;
                this.state.token = result.data.accessToken;
                this.state.userSeq = result.data.userSeq;
                this.state.userType=result.data.userType;
                this.state.userName=result.data.name;
                setCookie("userSeq", this.state.userSeq);
                setCookie("accessToken", this.state.token);
                setCookie("userType",this.state.userType);
                setCookie("userName",this.state.userName);
                if(this.state.userType===1){
                    history.push('/');
                    alert(result.data.name+'님 환영합니다!');
                }else{
                    history.push('/admin/product');
                    alert('관리자로 로그인 되었습니다.');
                }
            }
        }));

    }
    render() {
        const {id,password} = this.state;
        return (
            <div>
                <div className='login_page'>
                    <Header/>
                        <div className="login">
                            <div className="login-header-bar"/>
                            <div className='login__title'>Log in</div>
                            <div className='login__box'>
                                <div className='login__form__box'>
                                    <div className='login__form__content'>
                                        <div className='id__box'><div className="login-form-box-size">ID</div> <input type="text" className='input' name='id' id='login_id_box' value={id} onChange={this.handleChangeId} required/> </div>
                                        <div className='pw__box'><div className="login-form-box-size">Password</div><input type="password" className='input' name='pw' id='login_pw_box' value={password} onChange={this.handleChangePwd} onKeyPress={this.onKeyPress} required/></div>
                                        <button className='login-join' onClick={this.handleGoJoin}>회원가입</button>
                                        <button className='login__btn' onClick={this.login}>Log in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default withRouter(Login_page);