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
            token : undefined
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
        }).then((result)=>{
            if(result.status<400){
                const {history} = this.props;
                this.state.token = result.data.accessToken;
                setCookie("accessToken", this.state.token);
                history.push('/');
                alert('로그인 되었습니다.');
            }
        });

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
                                        <div className='id__box'><div className="login-form-box-size">ID</div> <input type="text" className='input' name='id' value={id} onChange={this.handleChangeId}/> </div>
                                        <div className='pw__box'><div className="login-form-box-size">Password</div><input type="password" className='input' name='pw' value={password} onChange={this.handleChangePwd}/></div>
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