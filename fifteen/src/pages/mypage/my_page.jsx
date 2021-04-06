import React, {Component} from 'react'
import styles from './my_page.module.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import My from '../../components/mypage/my';
import MyPage_side from '../../../src/components/MyPage_side/MyPage_side';

class MyPage extends Component {
    render(){
        return(
            <div>
                <div className={styles.My_Page}>
                    <Header />
                    <div className={styles.My_Page_line} />
                    <div className={styles.My_page__title}>My page</div>
                    <div className={styles.My_page__main}>
                        <MyPage_side />
                        <My />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default MyPage