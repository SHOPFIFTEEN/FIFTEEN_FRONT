import React, {Component} from 'react';
import styles from './footer.module.css';
import {withRouter, Link} from "react-router-dom";

class Footer extends Component {
    render() {
        return(
            <div>
                <div className={styles.footer}>
                    <div className={styles.footer__box}>
                        <div className={styles.footer__box_customer}>
                            <div className={styles.footer__box_customer__title}>customer</div>
                            <div className={styles.footer__box_customerText}>
                                <div>(주) MAPASHOP</div>
                                <div>대표 이사 : 김애웅</div>
                                <div>FAX : 02-7890-4132</div>
                                <div>사업자 등록 : 0142-91-8591</div>
                            </div>
                        </div>
                        <div className={styles.footer__box_row}>
                        <div className={styles.footer__box_follow}>
                            <div className={styles.footer__box_follow__title}>follow</div>
                            <div className={styles.footer__box_followText}>
                                <div>instagram</div> <div> kakao 1:1</div>
                            </div>
                         </div>
                        <div className={styles.footer__box_info}>
                            <div className={styles.footer__box_follow__title}>Info</div>
                            <div className={styles.footer__box_followText}>
                                <Link to='/privacy'> <div>PrivacyPolicy</div> </Link>
                                <Link to='/agreement'><div> Agreement</div></Link>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Footer);
