import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styles from './header.module.css';
import Menu from '../../img/menu.svg';
import Search from '../../img/search.svg';
import Heart from '../../img/heart.svg';
import Bucket from '../../img/bucket.svg';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {Link, withRouter} from "react-router-dom";
import { setCookie, getCookie, deleteCookie} from '../../cookies';

class Header extends Component {
    constructor(p) {
        super(p);
        this.state={
            modal : false,
            token : undefined,
            keyword : ''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    search = (e) => {
        this.setState({keyword : e.target.value })
        console.log(this.state.keyword);
    }

    componentDidMount(){
        this.setState({
            token : getCookie("accessToken")
        })
    }

    render() {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.header__box}>
                        <div className={styles.header__box__left}>
                            <Link to="/" >
                                <div className={styles.header__box__left__title}>#FIFTEEN</div>
                            </Link>
                            <div className={styles.header__box__left__category}>
                                Shopping mall specializing in domestic books
                            </div>
                        </div>
                        <div className={styles.header__box__right}>
                            <input type="text" name='search' onChange={this.search} className={styles.header__box__right__search__click}/>
                            <Link to={`/search/${this.state.keyword}`}>
                                <img src={Search} className={styles.header__box__right__search}/>
                            </Link>
                            <img src={Menu} className={styles.header__box__right__menu} onClick={()=> this.toggle()} />
                            <div className={styles.header__box__right__menu__modal__box}>
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle} contentClassName={(styles.header__box__right__menu__modal)} fullHeight position="right" >
                                        <div>
                                            <div className={styles.header__box__right__menu__modal__title}>
                                                <Link to='/list'>
                                                    <div>SHOP</div>
                                                </Link>
                                                <Link to="/order_page"><div>ORDER</div></Link>
                                                <div>BOARD</div>
                                            </div>
                                            <div className={styles.header__box__right__menu__modal__auth}>
                                                <Link to="/login"><div>{!(this.state.token) ? "Login" : "LogOut"}</div></Link>
                                                {!(this.state.token) ? <Link to ="/join"><div>Join</div></Link> : <Link to="/mypage"><div>My Page</div></Link>}
                                                <div></div>
                                                <img src={Bucket} className={styles.header__box__right__menu__modal__bucket}/>
                                                <img src={Heart} className={styles.header__box__right__menu__modal__heart}/>
                                            </div>
                                            <div className={styles.header__box__right__menu__modal__hr}></div>
                                            <div className={styles.header__box__right__menu__modal__contact}>
                                                <div>Instargram</div>
                                                <div>Kakao 1:1</div>
                                        </div>
                                    </div>
                                </MDBModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);