import React, {Component} from 'react';
import './bestseller.css';
import axios from 'axios';
import _ from 'lodash';
import {withRouter, Link} from "react-router-dom";


class Bestseller extends Component {
    constructor(props) {
        super(props);
        this.state = {
           products : [{'productSeq' : '1'}],
        }
    }

    getBookList = async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:3001/product',
            data: { },
            headers : {
                "Content-Type" : 'application/json'
            },
        })
        this.setState({products : result.data});
        var arr = this.state.products;
        var saleSort = _.sortBy(arr, ['sale']);
        var reverseSort = _.reverse(saleSort);
        var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({products: sliceSort});
    }

    componentDidMount() {
        this.getBookList();
    }

    render() {
        return (
            <div>
                <div className="bestSellerBox">
                    <div className="bestSellerTitle">Best Seller</div>
                    <div className="bestSellerBooks">
                        {this.state.products.map(arr => (
                            <div key={arr.productSeq}>
                                <Link to={`/product/${arr.productSeq}`}>
                                    <div className="bestSellerBookItem">
                                        <div className="list-product-item-imageBox">
                                            <img className="list-product-item-imageBox-img" src={arr.image} />
                                        </div>
                                        <div className="bestSellerBookItemTitle">{arr.title}</div>
                                        <div className="bestSellerBookItemSub">지은이 : {arr.author} | 출판사 : {arr.publisher}</div>
                                        <div className="bestSellerBookItemPrice">{arr.price}원</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Bestseller);