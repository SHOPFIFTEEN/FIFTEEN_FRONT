import React, {Component} from 'react';
import styles from './banner.module.css';
import Banner_1 from '../../img/banner_1.svg';
import Banner_2 from '../../img/banner_2.svg';
import Flicking from '@egjs/react-flicking';
import {AutoPlay, Parallax} from '@egjs/flicking-plugins';

class Banner extends Component {
    plugins = [new Parallax("img", 6), new AutoPlay(2000, "NEXT")]
    render() {
        return (
            <div>
                <Flicking className="flicking" duration={500} plugins={this.plugins}>
                    <div className={styles.panel}>
                        <img src={Banner_1} className={styles.img}/>
                    </div>
                    <div className={styles.panel}>
                        <img src={Banner_2} className={styles.img}/>
                    </div>
                </Flicking>
            </div>
        );
    }
}

export default Banner;