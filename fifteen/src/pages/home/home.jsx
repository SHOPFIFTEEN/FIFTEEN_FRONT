import React, {Component} from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Banner from '../../components/banner/Banner';
import styles from './home.module.css';

class Home extends Component {
    render() {
        return (
            <div>
                <Header className={styles.Header}/>
                <Banner clssName={styles.Banner}/>
                <Footer/>
            </div>
        );
    }
}

export default Home;