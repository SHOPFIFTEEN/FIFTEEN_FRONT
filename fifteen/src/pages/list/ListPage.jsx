import React, {Component} from 'react'
import './listPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {withRouter} from "react-router-dom";
import List from "../../components/list/list";

class ListPage extends Component {
    render(){
        return(
            <div className="listPage">
                <Header />
                <div className="listPage-box">
                    <List />
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(ListPage);