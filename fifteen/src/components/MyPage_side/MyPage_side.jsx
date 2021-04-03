import React, {Component} from 'react';
import styles from './MyPage_side.module.css';

class MyPage_side extends Component {
    render(){
        return(
            <div>
                <div className={styles.MyPage_side}>
                    <div className={styles.MyPage_side__bpx__category}>
                        <div className={styles.MyPage_side__category__text}>주문내역조회</div>
                        <div className={styles.MyPage_side__category__text}>회원정보</div>
                        <div className={styles.MyPage_side__category__text}>관심상품</div>
                        <div className={styles.MyPage_side__category__text}>쿠폰</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyPage_side