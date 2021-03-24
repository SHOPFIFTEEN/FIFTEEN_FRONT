import React, {Component} from 'react';
import styles from './header.module.css';

class Header extends Component {
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
                            <div className={styles.header__box__right__search}></div>
                            <div className={styles.header__box__right__menu}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;