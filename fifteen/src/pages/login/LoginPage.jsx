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
            token : getCookie("accessToken") //굳이 필요한가?
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
            url : "http://3.34.126.33:8080/user_info/get_login_token",
            headers: {
                "Content-Type": `application/json`,
            },
            data : {
                id : id,
                passwd : pw
            }
        }).then((response)=>{
            if(response?.isSuccess){
                const {history} = this.props;
                this.state.token = result.data.accessToken;
                setCookie("accessToken", this.state.token);
                history.push('/');
            }
        });

    }
    render() {
        const {id,password} = this.state;
        return (
            <div>
                <div className='login_page'>
                    <Header/>
                    <div>
                        <div className='login'>
                            <div className='header__bar'/>
                            <div className='login__title'>Log in</div>
                            <div className='login__box'>
                                <div className='login__form__box'>
                                    <div className='login__form__content'>
                                        <div className='id__box'>ID <input type="text" className='input' name='id' value={id} onChange={this.handleChangeId}/> </div>
                                        <div className='pw__box'>Password <input type="password" className='input' name='pw' value={password} onChange={this.handleChangePwd}/></div>
                                        <button className='join' onClick={this.handleGoJoin}>회원가입</button>
                                        <button className='login__btn' onClick={this.login}>Log in</button>
                                    </div>
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