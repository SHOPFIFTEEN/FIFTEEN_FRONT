import React, {Component} from 'react'
import './notice_page.css';
import '../order/orderPage.css'
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import {Link, withRouter} from "react-router-dom";
import axios from "axios";



class NoticePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products : [{'productSeq' : '1'}],
            notices : [{'noticeSeq': '1'}],
            noticeSeq : 0
        }
    }

    getNotice = async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:3001/notice',
            data: { },
            headers : {

                "Content-Type" : 'application/json'
            },
        })
        this.setState({notices : result.data});
    }


    componentDidMount() {
        this.getNotice();
    }
    render(){
        return(
            <div>
                <Header />
                <div className="orderPage">
                    <div className="orderPage_line" />
                    <div className="orderPage__title">Notice</div>
                    <div className="orderPage__main">
                        <div className="noticePage-nav">
                            <div className="noticePage-nav-side">
                                <Link to='/notice'><div className="noticePage-nav-text">공지</div></Link>
                                <Link to='/event'><div className="noticePage-nav-text">이벤트</div></Link>
                            </div>
                        </div>
                        <div>
                            <div className='notice-info-head'>
                                <div className='notice-info-title'>공지사항</div>
                                <div className='notice-info-sortBtn'>
                                <button className='notice-info-sort'>최신순</button>
                                <button className='notice-info-sort'>진행중</button>
                                <button className='notice-info-sort'>종료</button>
                                </div>
                            </div>
                            <div className='order-info'>
                                <div className="order_info_box">
                                    <div className="notice">
                                        <div className="notice-subject">
                                            <div className="notice-seq">번호</div>
                                            <div className="notice-title">제목</div>
                                            <div className="notice-date">기간</div>
                                        </div>
                                        {this.state.notices.map(arr=>(
                                            <div key={arr.noticeSeq}>
                                                <Link to={`/notice_detail/${arr.noticeSeq}`}>
                                                    <div className="notice-content">
                                                        <div className="notice-seq">{arr.noticeSeq}</div>
                                                        <div className="notice-title">{arr.title}</div>
                                                        <div className="notice-date">{arr.start_date} ~ {arr.end_date}</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="order_paging">
                                    <button className="order_paging_before">&lt;</button>
                                    <button className="order_paging_this">1</button>
                                    <button className="order_paging_after">&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(NoticePage);
