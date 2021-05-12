import React, {Component} from 'react';
import './admin.css';
import {withRouter} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [{'productSeq' : '1'}],
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
                    <div className="admin-event">
                        <div className="admin-event-title">
                            <div className="admin-event-title-text">공지/이벤트</div>
                            <button className="admin-event-title-recent">최근순</button>
                            <button className="admin-event-title-submit">등록</button>
                        </div>
                        <div className="admin-event-table">
                            <div className="admin-event-table-content">제목</div>
                            <div className="admin-event-table-term">진행기간</div>
                            <div className="admin-event-table-button" />
                        </div>
                        <div className="admin-event-table">
                            <div className="admin-event-table-content">3개월 독서왕</div>
                            <div className="admin-event-table-term">2021-03-10 ~ 2021-05-10</div>
                            <div className="admin-event-table-button">
                                <button className="admin-event-table-button-modify">수정</button>
                            </div>
                        </div>
                        <div className="admin-event-button">
                            <button className="admin-event-button-before">&lt;</button>
                            <button className="admin-event-button-now">1</button>
                            <button className="admin-event-button-after">&gt;</button>
                        </div>
                    </div>
                    <div className="admin-manage">
                        <div className="admin-manage-title">상품 관리</div>
                        <div className="admin-manage-box">
                            <div className="admin-manage-box-item">
                                {this.state.products.map(arr => (
                                    <div key={arr.productSeq}>
                                        <div className="bestSellerBookItem">
                                            <div className="list-product-item-imageBox">
                                                <img className="list-product-item-imageBox-img" src={arr.image} />
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
                <Footer />
            </div>
        )
    }
}

export default withRouter(Admin);