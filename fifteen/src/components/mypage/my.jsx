import React, {Component} from 'react'
import styles from './my.module.css';
import {withRouter} from "react-router-dom";

class My extends Component{
    render(){
        return(
            <div>
                <div className={styles.my}>
                    <div className={styles.my__box}>
                        <div className={styles.my__box_info}>
                            <div className={styles.my__box__info__left}>
                                <div className={styles.my__box__info__box}>
                                    <div className={styles.my__box__info__box__text}>총 주문</div>
                                    <div className={styles.my__box__info__box__cnt}>0</div>
                                </div>
                                <div className={styles.my__box__info__box}>
                                    <div className={styles.my__box__info__box__text}>쿠폰</div>
                                    <div className={styles.my__box__info__box__cnt}>0</div>
                                </div>
                            </div>
                            <div className={styles.my_box__info__bar} />
                            <div className={styles.my__box__info__right}>
                                <div className={styles.my__box__info__box}>
                                    <div className={styles.my__box__info__box__text}>총 적립금</div>
                                    <div className={styles.my__box__info__box__cnt}>0</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.my__box_order}>
                            <div className={styles.my__box_order__title}>나의 주문처리현황</div>
                            <div className={styles.my__box_order_stage}>
                                <div className={styles.my__box_order_stage__box}>
                                    <div className={styles.my__box_order_stage__box__text}>입금전</div>
                                    <div className={styles.my__box_order_stage__box__cnt}>0</div>
                                </div>
                                <div className={styles.my_box__stage__bar} />
                                <div className={styles.my__box_order_stage__box}>
                                    <div className={styles.my__box_order_stage__box__text}>배송준비중</div>
                                    <div className={styles.my__box_order_stage__box__cnt}>0</div>
                                </div>
                                <div className={styles.my_box__stage__bar} />
                                <div className={styles.my__box_order_stage__box}>
                                    <div className={styles.my__box_order_stage__box__text}>배송중</div>
                                    <div className={styles.my__box_order_stage__box__cnt}>0</div>
                                </div>
                                <div className={styles.my_box__stage__bar} />
                                <div className={styles.my__box_order_stage__box}>
                                    <div className={styles.my__box_order_stage__box__text}>배송완료</div>
                                    <div className={styles.my__box_order_stage__box__cnt}>0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(My);