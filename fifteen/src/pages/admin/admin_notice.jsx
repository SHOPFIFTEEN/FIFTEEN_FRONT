import React, {Component} from 'react';
import './admin_product.css';
import {withRouter, Link} from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";
import styles from "../../components/header/header.module.css";
import Search from "../../img/search.svg";


class AdminNotice extends Component {
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
                <div className={styles.header}>
                    <div className={styles.header__box}>
                        <div className={styles.header__box__left}>
                            <div className={styles.header__box__left__title}>#FIFTEEN</div>
                            <div className={styles.header__box__left__category}>
                                Shopping mall specializing in domestic books
                            </div></div></div></div>
                <div className="admin">
                    <div className="admin-bar" />
                    <div className="admin-title">관리자 페이지</div>
                    <div className="admin-box">
                        <AdminNav />
                        <div className="admin-event">
                            <div className='admin-searchBox'>
                                <input type="text" name='search' onChange={this.search} onKeyPress={this.onKeyPress} className='admin-searchBox-box'/>
                                {!(this.state.keyword)?  <img onClick={this.alert} src={Search} className='admin-searchBox-img'/>:
                                    <Link to={`/search/${this.state.keyword}`}>
                                        <img src={Search} className='admin-searchBox-img'/>
                                    </Link>}
                            </div>
                            <div className="admin-event-title">
                                <div className="admin-event-title-text">공지 관리</div>
                                <div className='admin-event-title-btn'>
                                    <button className="admin-event-title-recent">최신순</button>
                                    <button className='admin-event-title-recent'>활성화</button>
                                    <button className='admin-event-title-recent'>비활성화</button>
                                    <Link to={`/admin/notice_edit_page/${this.state.noticeSeq}`}>
                                    <button className="admin-event-title-submit">등록</button>
                                </Link>
                                </div>
                            </div>
                            <div className="admin-event-table">
                                <div className='admin-event-table-btnBox'>활성화</div>
                                <div className="admin-event-table-content">제목</div>
                                <div className="admin-event-table-term">진행기간</div>
                                <div className="admin-event-table-button" />
                            </div>
                            {this.state.notices.map(arr=>(
                                <div key={arr.noticeSeq}>
                                    <div className="admin-event-table">
                                    <div className='admin-event-table-btnBox'>
                                        <input type='checkbox' className='admin-event-table-check' />
                                    </div>
                                    <Link to={`/admin/notice_edit/${arr.noticeSeq}`}>
                                        <div className="admin-event-table">
                                            <div className="admin-event-table-content">{arr.title}</div>
                                            <div className="admin-event-table-term">{arr.start_date} ~ {arr.end_date}</div>
                                            <div className="admin-event-table-button">
                                                <Link to={`/admin/notice_edit_page/${arr.noticeSeq}`}>
                                                    <button className="admin-event-table-button-modify">수정</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                    </div>
                                </div>
                            ))}
                            <div className="admin-event-button">
                                <button className="admin-event-button-before">&lt;</button>
                                <button className="admin-event-button-now">1</button>
                                <button className="admin-event-button-after">&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminNotice);
