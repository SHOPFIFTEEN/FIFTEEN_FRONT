import React, {Component} from 'react';
import '../admin/admin_product.css';
import  '../admin_post/adminNoticePost.css'
import {withRouter, Link} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";
import moment from "moment";
import {getCookie} from "../../cookies";
import styles from "../../components/header/header.module.css";


class AdminNoticeEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            content : '',
            image : '',
            start_date : '',
            end_date : '',
            prevURL : ''
        }
    }

    getNoticeInfo = async function() {
        if(this.props.match.params.noticeSeq==='0'){
            this.state.noticeInfo = {
                title : null,
                content : null,
                image : null,
                start_date : null,
                end_date : null
            }}else{
            let result =await axios ({
                method : 'GET',
                url : `http://52.79.196.94:3001/notice/${this.props.match.params.noticeSeq}`,
                data: { },
                headers : {
                    "Content-Type" : 'application/json'
                },
            })
            this.setState({
                title : result.data[0].title,
                content : result.data[0].content,
                image : result.data[0].image,
                start_date : result.data[0].start_date,
                end_date : result.data[0].end_date
            });
        }
    }

    reNoticeInfo =() =>{
        let result = axios ({
            method : 'POST',
            url : `http://52.79.196.94:3001/notice/re/${this.props.match.params.noticeSeq}`,
            data : {
                title : this.state.title,
                content : this.state.content,
                image  : this.state.image,
                start_date : this.state.start_date,
                end_date : this.state.end_date
            },
            headers : {
                "Content-Type" : 'application/json',
                'x-access-token' : getCookie("accessToken")
            },
        })
    }

    addNoticeInfo = () =>{
        let result = axios ({
            method : 'POST',
            url : `http://52.79.196.94:3001/notice/add`,
            data : {
                title : this.state.title,
                content : this.state.content,
                image  : this.state.image,
                start_date : this.state.start_date,
                end_date : this.state.end_date
            },
            headers : {
                "Content-Type" : 'application/json',
                'x-access-token' : getCookie("accessToken")
            },
        })
    }

    handleChangeTitle = (e) => {
        this.setState({
            title : e.target.value,
        })
    }

    handleChangeContent = (e) => {
        this.setState({
            content : e.target.value,
        });
    }

    handleChangeImage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                prevURL : reader.result,
                image : file
            })
        }
        reader.readAsDataURL(file);
    }

    handleChangeStartDate = (e) => {
        this.setState({
            start_date : moment(e.target.value).format('YYYY-MM-DD'),
        })
    }

    handleChangeEndDate = (e) => {
        this.setState({
            end_date : moment(e.target.value).format('YYYY-MM-DD'),
        })
    }

    componentDidMount() {
        this.getNoticeInfo();
    }

    render(){
        let profile_preview = null;
        if(this.state.file !== ''){
            profile_preview = <img src={this.state.prevURL} width='500px' height='500px'/>
        }

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
                                <div className="admin-event-title-text">공지 수정</div>
                            </div>
                            {/*adminNoticePost.css*/}
                            <div className='admin-info'>
                                <div className='admin_info_box'>
                                    <div className='admin-info-box-titleBox'>
                                        <div className='admin-info-box-titleBox-title'>제목</div>
                                        <input type='text' onChange={this.handleChangeTitle} className='admin-info-box-titleBox-text' value={this.state.title}/>
                                    </div>
                                    <div className='admin-info-box-titleBox'>
                                        <div className='admin-info-box-titleBox-title'>기간</div>
                                        <input type='date' onChange={(e)=>this.handleChangeStartDate(e)} className='admin-info-box-titleBox-text' value={this.state.start_date}/> ~
                                        <input type='date' onChange={(e)=>this.handleChangeEndDate(e)} className='admin-info-box-titleBox-text' value={this.state.end_date}/>
                                    </div>
                                    <div className='admin-info-box-main-post'>
                                        <div className='admin-info-box-main-box'>
                                            <div className='admin-info-box-main-title'>내용</div>
                                        </div>
                                        <div className='admin-info-box-main-content'>
                                            <input type='file' onChange={this.handleChangeImage}/>
                                            {profile_preview}
                                            <br/>
                                            <input type='text' onChange={this.handleChangeContent} value={this.state.content}/>
                                        </div>
                                    </div>
                                    <div className='admin-info-box-button'>
                                        <Link to={`/admin/event_edit/${this.props.match.params.noticeSeq}`}>
                                            <button className='admin-info-box-btn-cancel'>취소</button>
                                        </Link>
                                        <div>
                                            {!(this.props.match.params.noticeSeq==='0') ?
                                                <Link to={`/admin/notice`}>
                                                    <button onClick={this.reNoticeInfo} className='admin-info-box-btn-submit'>수정</button>
                                                </Link>
                                                :
                                                <Link to={`/admin/notice`}>
                                                    <button onClick={this.addNoticeInfo} className='admin-info-box-btn-submit'>등록</button>
                                                </Link>
                                            }
                                        </div>
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

export default withRouter(AdminNoticeEditPage);
