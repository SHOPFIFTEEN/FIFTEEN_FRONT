import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styles from './header.module.css';
import './header.module.css';
import Menu from '../../img/menu.svg';
import Search from '../../img/search.svg';
import Heart from '../../img/heart.svg';
import Bucket from '../../img/bucket.svg';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {Link, withRouter} from "react-router-dom";
import { setCookie, getCookie, deleteCookie} from '../../cookies';
import axios from "axios";
import _ from "lodash";

class Header extends Component {
    constructor(p) {
        super(p);
        this.state={
            modal : false,
            token : undefined,
            keyword : '',
            userSeq : undefined,
            userName: undefined,
            products : [],
            sum : 0
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

    onKeyPress=(e)=>{
        if(this.state.keyword){
            if(e.key==='Enter'){
                this.setState({keyword : e.target.value })
                const {history} = this.props;
                history.push(`/search/${this.state.keyword}`);
            }
        }else{
            alert('검색어를 입력해주세요')
        }
    }

    logout=()=> {
        const {history} = this.props;
        deleteCookie("accessToken");
        deleteCookie("userSeq");
        deleteCookie("userName");
        this.setState({
            token : undefined
        });
        alert('로그아웃 되었습니다.');
        history.push('/');
    }

    alert=()=> {
        alert('검색어를 입력해주세요');
    }

    getCart = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/cart`,
            data: {},
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": getCookie("accessToken"),
            },
        });
        this.setState({products: result.data});
        let sum = _.sumBy(result.data, function (o) {
            return o.count
        });
        this.setState({sum : sum});
    }

    componentDidMount(){
        this.setState({
            token : getCookie("accessToken"),
            userSeq : getCookie("userSeq"),
            userName : getCookie("userName"),
        })
        this.getCart();
    }

    render() {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.header__box__top}>
                        <div className={styles.header__box__right__menu__modal__header__login}>
                            <div className={styles.header_top_login_text}>{!(this.state.token) ? <Link to='/login'><div>login</div></Link> : <div id="logout" onClick={this.logout}>{this.state.userName}님&nbsp;&nbsp; logout</div>}</div>
                            <div className={styles.header_top_join_text}>{!(this.state.token) ? <Link to ="/join"><div className='header-top-login-text'>Join</div></Link> : <Link to="/mypage"><div>My Page</div></Link>}</div>
                            <div className={styles.header_top_wish_text}>{!(this.state.token) ? null : <Link to ="/wishlist">
                                <div className={styles.cart}>
                                    <img src={Bucket} className={styles.header__box__right__menu__modal__bucket__header}/>
                                    {!(this.state.sum) ? null : <div className={styles.cart_sum}>{this.state.sum}</div>}
                                </div></Link>}</div>

                        </div>
                    </div>
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
                            <input type="text" name='search' onChange={this.search} onKeyPress={this.onKeyPress} className={styles.header__box__right__search__click}/>
                            {!(this.state.keyword)?  <img onClick={this.alert} src={Search} className={styles.header__box__right__search}/>:
                                <Link to={`/search/${this.state.keyword}`}>
                                <img src={Search} className={styles.header__box__right__search}/>
                            </Link>}
                            <img src={Menu} className={styles.header__box__right__menu} onClick={()=> this.toggle()} />
                            <div className={styles.header__box__right__menu__modal__box}>
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle} contentClassName={(styles.header__box__right__menu__modal)} fullHeight position="right" >
                                        <div>
                                            <div className={styles.header__box__right__menu__modal__title}>
                                                <Link to={`/list/${'전체'}`}>
                                                    <div>SHOP</div>
                                                </Link>
                                                <Link to="/order_page"><div>ORDER</div></Link>
                                                <Link to="/notice"> <div>BOARD</div></Link>
                                            </div>
                                            <div className={styles.header__box__right__menu__modal__auth}>
                                                <div>{!(this.state.token) ? <Link to='/login'><div>login</div></Link> : <div onClick={this.logout}>logout</div>}</div>
                                                {!(this.state.token) ? <Link to ="/join"><div>Join</div></Link> : <Link to="/mypage"><div>My Page</div></Link>}
                                                <div></div>
                                                {!(this.state.token) ? null : <Link to ="/wishlist"> <div className={styles.cart}>
                                                    <img src={Bucket} className={styles.header__box__right__menu__modal__bucket__header}/>
                                                    {!(this.state.sum) ? null : <div className={styles.cart_sum}>{this.state.sum}</div>}
                                                </div></Link>}
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