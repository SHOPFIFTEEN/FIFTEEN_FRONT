import React, {Component} from 'react';
import styles from './login.module.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { setCookie, getCookie, deleteCookie} from '../../cookies';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            password : '',
            token : undefined
        }
    }

    _changeID = function() {
        const id_v = document.getElementsByName('id')[0].value;

        this.setState({
            id : id_v
        })
    }

    _changePW = function() {
        const pw_v = document.getElementsByName('password')[0].value;

        this.setState({
            password : pw_v
        })
    }

    login = function() {
        let id = this.state.id;
        let pw = this.state.password;
        let result = axios( {
            method : 'POST',
            url : "http://3.34.126.33:8080/user_info/get_login_token",
            headers: {
                "Content-Type": `application/json`,
            },
            data : {
                id : id,
                passwd : pw
            }
        });
        if(result.status <= 204 && result.status >=200){
                this.state.token = result.data.accessToken;
                setCookie("accessToken", this.state.token);
            }
    }

    componentDidMount(){
        this.setState({
            token : getCookie("accessToken")
        })
    }

    render() {
        return (
            <div>
                <div className={styles.login}>
                    <div className={styles.header__bar}></div>
                    <div className={styles.login__title}>Log in</div>
                    <div className={styles.login__box}>
                        <div className={styles.login__form__box}>
                            <div className={styles.login__form__content}>
                                <div className={styles.id__box}>ID <input type="text" className={styles.input} name='id' onChange={()=>this._changeID()}/> </div>
                                <div className={styles.pw__box}>Password <input type="password" className={styles.input} name='pw' onChange={()=>this._changePW()}/></div>
                                <Link to="/join">
                                    <div className={styles.join}>회원가입</div>
                                </Link>
                                <Link to='/'><div className={styles.login__btn} onClick={() => this.login()}>Log in</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;