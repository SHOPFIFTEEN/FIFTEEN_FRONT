import React, {Component} from 'react';
import styles from './sidenav.module.css';
import {withRouter} from "react-router-dom";

class Sidenav extends Component {
    render() {
        return(
            <div>
                <div className={styles.sidenav}>
                    <div className={styles.sidenav__box}>
                        <button className={styles.sidenav__box_instargram}>INSTARGRAM</button>
                        <div className={styles.sidenav__box__bar} />
                        <button className={styles.sidenav__box_back}>BACK</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Sidenav);