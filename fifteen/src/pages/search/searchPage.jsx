import React, {Component} from 'react'
import './searchPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import _ from "lodash";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList : [],
            searchListSort : [{a:'a'}],
        }
    }

    searchResult = async function() {
        let result =await axios ({
            method: 'GET',
            url: `http://52.79.196.94:3001/search/${this.props.match.params.keyword}`,
            headers: {
                "Content-Type": `application/json`,
            },
            params : {
                Keyword : this.props.match.params.keyword
            }
        })
        this.setState({searchList : result.data});
        this.setState({searchListSort: this.state.searchList});
    }

    sortBySale() {
        var arr = this.state.searchListSort;
        var saleSort = _.sortBy(arr, ['sale']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({searchListSort: reverseSort});
    }

    sortByHighPrice() {
        var arr = this.state.searchListSort;
        var saleSort = _.sortBy(arr, ['price']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({searchListSort: reverseSort});
    }

    sortByRowPrice() {
        var arr = this.state.searchListSort;
        var saleSort = _.sortBy(arr, ['price']);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({searchListSort: saleSort});
    }

    sortByRecent(){
        var arr = this.state.searchListSort;
        var saleSort = _.sortBy(arr, ['productSeq']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({searchListSort: reverseSort});
    }

    sortByName(){
        var arr = this.state.searchListSort;
        arr.sort(function(a,b){
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
        this.setState({searchListSort : arr});
    }

    componentDidMount() {
        this.searchResult();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.keyword !== prevProps.match.params.keyword){
            this.searchResult();
        }
    }

    render(){
        return(
            <div className="searchPage">
                <Header />
                <div className="searchCrumbBox">
                    <div className="searchCrumb">
                        <span>'{this.props.match.params.keyword}'</span>로 검색한 결과입니다.
                    </div>
                </div>
                <div className="list-sortBox">
                    <button className="list-sortBox-sort">sort</button>
                    <div className="list-sortBox-bar"/>
                    <button className="list-sortBox-sale" onClick={() => this.sortByRecent()}>최신등록순</button>
                    <button className="list-sortBox-lowPrice" onClick={()=> this.sortByRowPrice()}>낮은 가격순</button>
                    <button className="list-sortBox-highPrice" onClick={()=> this.sortByHighPrice()}>높은 가격순</button>
                    <button className="list-sortBox-highPrice" onClick={()=> this.sortByName()}>이름순</button>
                </div>
                    <div className="list-product">
                        {this.state.searchListSort.map(arr => (
                            <div key={arr.productSeq}>
                                <Link to={`/product/${arr.productSeq}/${this.props.match.params.keyword}`}>
                                    <div className="list-product-item">
                                        <div className="list-product-item-imageBox">
                                            <img className="list-product-item-imageBox-img" src={arr.image} />
                                        </div>
                                        <div className="list-product-item-title">{arr.title}</div>
                                        <div className="list-product-item-sub">지은이 : {arr.author} | 출판사 : {arr.publisher}</div>
                                        <div className="list-product-item-price">{arr.price}</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Search);