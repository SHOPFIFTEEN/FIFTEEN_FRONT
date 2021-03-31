import React, {Component} from 'react';
import styles from './login.module.css';

class Login extends Component {
    render() {
        return (
            <div>
                <div className={styles.login}>
                    <div className={styles.header__bar}></div>
                    <div className={styles.login__title}>Log in</div>
                    <div className={styles.login__box}>
                        <div className={styles.login__form__box}>
                            <div className={styles.login__form__content}>
                                <div className={styles.id__box}>ID <input type="text" className={styles.input}/> </div>
                                <div className={styles.pw__box}>Password <input type="password" className={styles.input}/></div>
                                <div className={styles.join}>회원가입</div>
                                <div className={styles.login__btn}>Log in</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;