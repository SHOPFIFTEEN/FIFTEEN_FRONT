import React, {Component} from 'react';
import '../admin_post/adminNoticePost.css';
import  '../admin_post/adminNoticePost.css'
import {withRouter, Link} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";
import {getCookie, setCookie} from "../../cookies";
import styles from "../../components/header/header.module.css";


class AdminNoticeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeInfo : []
        }
    }

    getNoticeInfo = async function() {
        let result =await axios ({
            method : 'GET',
            url : `http://52.79.196.94:3001/notice/${this.props.match.params.noticeSeq}`,
            data: { },
            headers : {
                "Content-Type" : 'application/json'
            },
        })
        this.setState({noticeInfo : result.data[0]});
        console.log(this.state.noticeInfo);
        console.log(this.props.match.params.noticeSeq);
    }

    deleteNoticeInfo =()=> {
        var response = window.confirm('삭제하시겠습니까?');
        if(response){
            let result = axios ({
                method : 'DELETE',
                url : `http://52.79.196.94:3001/notice/ki/${this.props.match.params.noticeSeq}`,
                headers : {
                    "Content-Type" : 'application/json',
                    'x-access-token' : getCookie("accessToken")
                },
            }).then((result)=>{
                if(result.status<400){
                    const {history} = this.props;
                    alert('삭제되었습니다.');
                    history.push('/admin/notice');
                }}
            )
        }else{
            alert('삭제를 취소하였습니다.');
        }
    }

    componentDidMount() {
        this.getNoticeInfo();
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
                {/* admin_product.css*/}
                <div className="admin">
                    <div className="admin-bar" />
                    <div className="admin-title">관리자 페이지</div>
                    <div className="admin-box">
                        <AdminNav />
                        <div className="admin-event">
                            <div className="admin-event-title">
                                <div className="admin-event-title-text">공지 관리</div>
                                <div className='admin-event-title-btn'>
                                <Link to={`/admin/notice_edit_page/${this.props.match.params.noticeSeq}`}>
                                    <button className="admin-event-title-modify">수정</button>
                                </Link>
                                <button onClick={this.deleteNoticeInfo} className="admin-event-title-delete">삭제</button>
                            </div>
                            </div>
                            {/*adminNoticePost.css*/}
                            <div className='admin-info'>
                                <div className='admin_info_box'>
                                    <div className='admin-info-box-titleBox'>
                                        <div className='admin-info-box-titleBox-title'>제목</div>
                                        <div className='admin-info-box-titleBox-text'>{this.state.noticeInfo.title}</div>
                                    </div>
                                    <div className='admin-info-box-subBox'>
                                        <div className='admin-info-box-subBox-date'>
                                            <div className='admin-info-box-subBox-title'>기간</div>
                                            <div className='admin-info-box-subBox-text'>{this.state.noticeInfo.start_date} ~ {this.state.noticeInfo.end_date}</div>
                                        </div>
                                    </div>
                                    <div className='admin-info-box-main-edit'>
                                        <img src={this.state.noticeInfo.image} width='500px' height='500px' />
                                        <br/>
                                        {this.state.noticeInfo.content}
                                    </div>
                                </div>
                            </div>
                            {/*adminNoticePost.css*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminNoticeEdit);
