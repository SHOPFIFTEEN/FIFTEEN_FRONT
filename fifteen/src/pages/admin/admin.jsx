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
            notices : [{'noticeSeq': '1'}]
        }
    }

    getNotice = async function(){
        let nresult = await axios({
            method : 'GET',
            url : 'http://52.79.196.94:3001/notice',
            data : { },
            headers : {
                'Access-Control-Allow-Origin' : '*',
                "Content-Type" : 'application/json'
            },
        })
        this.setState({notices : nresult.data});
        console.log(this.state.notices);
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
        this.getNotice();
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
                            {this.state.notices.map(arr => (
                                <div key = {arr.noticeSeq}>
                                    <div className="admin-event-table">
                                    <div className="admin-event-table-content">{arr.title}</div>
                                    <div className="admin-event-table-term">{arr.start_date} ~ {arr.end_date}</div>
                                    <div className="admin-event-table-button">
                                        <button className="admin-event-table-button-modify">수정</button>
                                    </div>
                                </div>
                                </div>
                            ))}
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