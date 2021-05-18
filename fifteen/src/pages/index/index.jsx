import React, {Component} from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Banner_1 from '../../img/banner.svg';
import Banner_2 from '../../img/banner_2.svg';
import Bestseller from "../../components/bestSeller/Bestseller";
import RecentBooks from "../../components/recentBooks/RecentBooks";
import './index.css';
import {withRouter} from "react-router-dom";

class Index extends Component {
    render() {
        return (
            <div className="indexBox">
                <Header/>
                <img src={Banner_1} className="indexImg"/>
                <Bestseller/>
                <RecentBooks/>
                <img src={Banner_2} className="indexImgBottom"/>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(Index);