import React, {Component} from 'react';
import styles from './sidenav.module.css';

class Sidenav extends Component {
    render() {
        return(
            <div>
                <div className={styles.sidenav}>
                    <div className={styles.sidenav__box}>
                        <div className={styles.sidenav__box__text1}>INSTARGRAM</div>
                        <div className={styles.sidenav__box__text__bar} />
                        <div className={styles.sidenav__box__text2}>BACK</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Sidenav;