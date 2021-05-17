import React, {Component} from 'react';
import '../admin_post/adminNoticePost.css';
import  '../admin_post/adminNoticePost.css'
import {withRouter} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";


class AdminNoticeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [{'productSeq' : '1'}],
            notices : [{'noticeSeq': '1'}],
        }
    }

    getNotice = async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:3001/notice',
            data: { },
            headers : {
                'Access-Control-Allow-Origin' : '*',
                "Content-Type" : 'application/json'
            },
        })
        this.setState({notices : result.data});
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
                {/* admin_product.css*/}
                <div className="admin">
                    <div className="admin-bar" />
                    <div className="admin-title">관리자 페이지</div>
                    <div className="admin-box">
                        <AdminNav />
                        <div className="admin-event">
                            <div className="admin-event-title">
                                <div className="admin-event-title-text">공지 관리</div>
                                <button className="admin-event-title-modify">수정</button>
                                <button className="admin-event-title-delete">삭제</button>
                            </div>
                            {/*adminNoticePost.css*/}
                            <div className='admin-info'>
                                <div className='admin_info_box'>
                                    <div className='admin-info-box-titleBox'>
                                        <div className='admin-info-box-titleBox-title'>제목</div>
                                        <div className='admin-info-box-titleBox-text'>구매 전 필독 공지사항</div>
                                    </div>
                                    <div className='admin-info-box-subBox'>
                                        <div className='admin-info-box-subBox-date'>
                                            <div className='admin-info-box-subBox-title'>작성일</div>
                                            <div className='admin-info-box-subBox-text'>2021-05-15</div>
                                        </div>
                                        <div className='admin-info-box-subBox-views'>
                                            <div className='admin-info-box-subBox-title'>조회수</div>
                                            <div className='admin-info-box-subBox-text'> </div>
                                        </div>
                                    </div>
                                    <div className='admin-info-box-main-edit'>

                                    </div>
                                </div>
                            </div>
                            {/*adminNoticePost.css*/}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(AdminNoticeEdit);
