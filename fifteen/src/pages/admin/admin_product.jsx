import React, {Component} from 'react';
import './admin_product.css';
import {withRouter} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";


class AdminProduct extends Component {
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
                'Access-Control-Allow-Origin' : '*',
                "Content-Type" : 'application/json'
            },
        })
        this.setState({products : result.data});
    }

    componentDidMount() {
        this.getBookList();
    }

    render(){
        return(
            <div>
                <Header />
                <div className="admin">
                    <div className="admin-bar" />
                    <div className="admin-title">관리자 페이지</div>
                    <div className="admin-box">
                        <AdminNav />
                        <div className="admin-manage">
                            <div className="admin-manage-title">상품 관리</div>
                            <div className="admin-manage-box">
                                <div className="admin-manage-box-item">
                                    {this.state.products.map(arr => (
                                        <div key={arr.productSeq}>
                                            <div className="bestSellerBookItem">
                                                <div className="admin-product-item-imageBox">
                                                    <img className="admin-product-item-imageBox-img" src={arr.image} />
                                                </div>
                                                <div className="bestSellerBookItemTitle">{arr.title}</div>
                                                <div className="bestSellerBookItemSub">지은이 : {arr.author} | 출판사 : {arr.publisher}</div>
                                                <div className="bestSellerBookItemPrice">{arr.price}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(AdminProduct);