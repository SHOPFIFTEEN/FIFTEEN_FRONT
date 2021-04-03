import React, {Component} from 'react';
import styles from './login_page.module.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import Login from '../../components/login/Login';

class Login_page extends Component {
    render() {
        return (
            <div>
                <div className={styles.login}>
                    <Header/>
                    <Login/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Login_page;