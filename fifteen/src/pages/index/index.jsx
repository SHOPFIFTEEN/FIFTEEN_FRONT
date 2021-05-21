import React, {Component} from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Banner_1 from '../../img/banner.svg';
import Banner_2 from '../../img/banner_2.svg';
import Bestseller from "../../components/bestSeller/Bestseller";
import RecentBooks from "../../components/recentBooks/RecentBooks";
import './index.css';
import {Link, withRouter} from "react-router-dom";
import _ from "lodash";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [{'productSeq' : '1'}],
            fieldProducts : [{'productSeq' : '1'}],
            field : '',
            keyword : 'field'
        }
    }

    fieldProducts(f) {
        if(f=='전체'){
            this.setState({fieldProducts : this.state.products});
        }else{
            var filterProduct = _.filter(this.state.products, {'field' : f});
            this.setState({fieldProducts : filterProduct});
        }

        //클릭시 강조 표시 추가 필요
    }
    render() {
        return (
            <div className="indexBox">
                <Header/>
                <div className="field">
                    <Link to="/list"><div className="index-fieldBox">
                        <div onClick={()=>this.fieldProducts('전체')} >전체</div>
                        <div onClick={()=>this.fieldProducts('소설')}>소설</div>
                        <div onClick={()=>this.fieldProducts('시/에세이')}>시/에세이</div>
                        <div onClick={()=>this.fieldProducts('경제/경영')}>경제/경영</div>
                        <div onClick={()=>this.fieldProducts('역사/문화')}>역사/문화</div>
                        <div onClick={()=>this.fieldProducts('컴퓨터/IT')}>컴퓨터/IT</div>
                        <div onClick={()=>this.fieldProducts('외국어')}>외국어</div>
                        <div onClick={()=>this.fieldProducts('여행')}>여행</div>
                        <div onClick={()=>this.fieldProducts('만화')}>만화</div>
                    </div></Link>
                </div>
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