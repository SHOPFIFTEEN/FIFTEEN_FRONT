import React, {Component} from 'react';
import './join_page.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import Join from '../../../src/components/join/Join';

class JoinPage extends Component {
    render() {
        return (
            <div>
                <div className="join_page">
                    <Header/>
                    <Join/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default JoinPage;