import React, {Component} from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Sidenav from "../../components/sidenav/Sidenav";

class Index extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Sidenav/>
                <Footer/>
            </div>
        );
    }
}

export default Index;