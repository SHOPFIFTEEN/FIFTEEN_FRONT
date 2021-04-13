import React, {Component} from 'react';
import styles from './MyPage_side.module.css';
import { Link} from "react-router-dom";

class MyPage_side extends Component {
    render(){
        return(
            <div>
                <div className={styles.MyPage_side}>
                    <div className={styles.MyPage_side__bpx__category}>
                        <div className={styles.MyPage_side__category__text}>주문내역조회</div>
                        <Link to='/profile'><div className={styles.MyPage_side__category__text}>회원정보</div></Link>
                        <Link to='/wishlist'><div className={styles.MyPage_side__category__text}>관심상품</div></Link>
                        <Link to='/coupon'><div className={styles.MyPage_side__category__text}>쿠폰</div></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyPage_side