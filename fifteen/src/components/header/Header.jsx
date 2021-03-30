import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styles from './header.module.css';
import Menu from '../../img/menu.svg';
import Search from '../../img/search.svg';
import Heart from '../../img/heart.svg';
import Bucket from '../../img/bucket.svg';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Header extends Component {
    constructor(p) {
        super(p);
        this.state={
            modal : false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.header__box}>
                        <div className={styles.header__box__left}>
                            <div className={styles.header__box__left__title}>#FIFTEEN</div>
                            <div className={styles.header__box__left__category}>
                                <div>국내 도서</div> <div>&#47;</div>
                                <div>외국 도서</div> <div>&#47;</div>
                                <div>추천 도서</div> <div>&#47;</div>
                                <div>ebook</div>
                            </div>
                        </div>
                        <div className={styles.header__box__right}>
                            <img src={Search} className={styles.header__box__right__search}/>
                            <img src={Menu} className={styles.header__box__right__menu} onClick={()=> this.toggle()} />
                            <div className={styles.header__box__right__menu__modal__box}>
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle} contentClassName={(styles.header__box__right__menu__modal)} fullHeight position="right" >
                                        <div>
                                            <div className={styles.header__box__right__menu__modal__title}>
                                                <div>SHOP</div>
                                                <div>ORDER</div>
                                                <div>BOARD</div>
                                            </div>
                                            <div className={styles.header__box__right__menu__modal__auth}>
                                                <div>Login</div>
                                                <div>Join</div>
                                                <div>My Page</div>
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

export default Header;