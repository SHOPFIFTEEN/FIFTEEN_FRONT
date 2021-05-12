import React, {Component} from 'react';
import './list.css';
import axios from 'axios';
import _ from 'lodash';
import {withRouter} from "react-router-dom";


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [{'productSeq' : '1'}],
            fieldProducts : [{'productSeq' : '1'}],
            field : ''
        }
    }

    getBookList = async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:8080/product/select_all',
            data: { },
            headers : {
                'Access-Control-Allow-Origin' : '*',
                "Content-Type" : 'application/json'
            },
        })
        this.setState({products : result.data});
        this.setState({fieldProducts: this.state.products});
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

    sortBySale() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['sale']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({fieldProducts: reverseSort});
    }

    sortByHighPrice() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['price']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({fieldProducts: reverseSort});
    }

    sortByRowPrice() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['price']);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({fieldProducts: saleSort});
    }

    componentDidMount() {
        this.getBookList();
    }

    render() {
        return (
            <div>
                <div className="list">
                    <div className="list-fieldBox">
                        <div onClick={()=>this.fieldProducts('전체')}>전체</div>
                        <div onClick={()=>this.fieldProducts('소설')}>소설</div>
                        <div onClick={()=>this.fieldProducts('시/에세이')}>시/에세이</div>
                        <div onClick={()=>this.fieldProducts('경제/경영')}>경제/경영</div>
                        <div onClick={()=>this.fieldProducts('역사/문화')}>역사/문화</div>
                        <div onClick={()=>this.fieldProducts('컴퓨터/IT')}>컴퓨터/IT</div>
                        <div onClick={()=>this.fieldProducts('외국어')}>외국어</div>
                        <div onClick={()=>this.fieldProducts('여행')}>여행</div>
                        <div onClick={()=>this.fieldProducts('만화')}>만화</div>
                    </div>
                    <div className="list-sortBox">
                        <button className="list-sortBox-sort">sort</button>
                        <div className="list-sortBox-bar"/>
                        <button className="list-sortBox-sale" onClick={() => this.sortBySale()}>판매량순</button>
                        <button className="list-sortBox-lowPrice" onClick={()=> this.sortByRowPrice()}>낮은 가격순</button>
                        <button className="list-sortBox-highPrice" onClick={()=> this.sortByHighPrice()}>높은 가격순</button>
                    </div>
                    <div className="list-product">
                        {this.state.fieldProducts.map(arr => (
                            <div key={arr.productSeq}>
                                <div className="list-product-item">
                                    <div className="list-product-item-imageBox">
                                        <img className="list-product-item-imageBox-img" src={arr.image} />
                                    </div>
                                    <div className="list-product-item-title">{arr.title}</div>
                                    <div className="list-product-item-sub">지은이 : {arr.author} | 출판사 : {arr.publisher}</div>
                                    <div className="list-product-item-price">{arr.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(List);