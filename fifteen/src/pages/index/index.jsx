import React, {Component} from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Sidenav from "../../components/sidenav/Sidenav";
import Banner_1 from '../../img/banner.svg';
import Banner_2 from '../../img/banner_2.svg';
import './index.css';

class Index extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Sidenav/>
                <img src={Banner_1} className="indexImg"/>
                <img src={Banner_2} className="indexImg"/>
                <Footer/>
            </div>
        );
    }
}

export default Index;