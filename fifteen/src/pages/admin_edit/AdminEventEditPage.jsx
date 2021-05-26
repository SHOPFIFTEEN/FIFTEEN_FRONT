import React, {Component} from 'react';
import '../admin/admin_product.css';
import  '../admin_post/adminNoticePost.css'
import {withRouter, Link} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";
import { setCookie, getCookie, deleteCookie} from '../../cookies';
import moment from "moment";
import styles from "../../components/header/header.module.css";


class AdminEventEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            content : '',
            selectedFile: null,
            image: null,
            imageURL : null,
            start_date : '',
            end_date : '',
            prevURL : '',
            isUpload : false
        }
    }

    getEventInfo = async function() {
        if(this.props.match.params.eventSeq==='0'){
            this.state.eventInfo = {
                title : null,
                content : null,
                image : null,
                start_date : null,
                end_date : null
            }}else{
                let result =await axios ({
                    method : 'GET',
                    url : `http://52.79.196.94:3001/event/${this.props.match.params.eventSeq}`,
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

    reEventInfo =async () =>{
        let {isUpload} = this.state;
        if(isUpload===false){
            alert("이미지를 업로드 해주세요");
        }else{
            const {history} = this.props;
            let result = await axios ({
                method : 'POST',
                url : `http://52.79.196.94:3001/event/re/${this.props.match.params.eventSeq}`,
                data : {
                    title : this.state.title,
                    content : this.state.content,
                    image : this.state.imageURL,
                    start_date : this.state.start_date,
                    end_date : this.state.end_date
                },
                headers : {
                    "Content-Type" : 'application/json',
                    'x-access-token' : getCookie("accessToken")
                },
            })
            history.push('/admin/event')
        }
    }

    addEventInfo = async () =>{
        let {isUpload,title,content,start_date,end_date} = this.state;
        if(isUpload===false){
            alert("이미지를 업로드 해주세요");
        }else if(!title || !content || !start_date|| !end_date){
            alert("필수정보를 입력해 주세요")
        }else{
            const {history} = this.props;
            let result = await axios ({
                method : 'POST',
                url : `http://52.79.196.94:3001/event/add`,
                data : {
                    title : this.state.title,
                    content : this.state.content,
                    image : this.state.imageURL,
                    start_date : this.state.start_date,
                    end_date : this.state.end_date
                },
                headers : {
                    "Content-Type" : 'application/json',
                    'x-access-token' : getCookie("accessToken")
                },
            })
            history.push('/admin/event')
        }
    }
    handlePost=()=>{
        const image = new FormData();
        image.append('file', this.state.selectedFile);
        return axios.post("http://52.79.196.94:3001/image/upload", image).then(res => {
            alert('성공');
            this.setState({imageURL : res.data.image});
            this.setState({isUpload : true});
            console.log(this.state.imageURL);
        }).catch(err => {
            alert('실패')
        })
    }

    rehandlePost=()=>{
        const image = new FormData();
        image.append('file', this.state.selectedFile);
        return axios.post(`http://52.79.196.94:3001/image/upload`, image).then(res => {
            alert('성공');
            this.setState({imageURL : res.data.image});
            this.setState({isUpload : true});
            console.log(this.state.imageURL);
        }).catch(err => {
            alert('실패')
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

    handleFileInput(e){
        this.setState({
            selectedFile : e.target.files[0],
        })
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
        this.getEventInfo();
    }

    render(){
        let profile_preview = null;
        if(this.state.file !== ''){
            profile_preview = <img src={this.state.prevURL} width='250px' height='250px'/>
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
                                {!(this.props.match.params.eventSeq==='0') ?
                                    <div className="admin-event-title-text">이벤트 수정</div>
                                    :
                                    <div className="admin-event-title-text">이벤트 등록</div>
                                }
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
                                            <input type='text' className='admin-info-box-main-content-text' onChange={this.handleChangeContent} value={this.state.content}/>
                                            <div className='admin-info-box-main-content-image'>
                                                {profile_preview}
                                                <div className='admin-style-columns'>
                                                    <input type='file' name="file" onChange={e => this.handleFileInput(e)}/>
                                                    {!(this.props.match.params.eventSeq==='0') ?
                                                        <button type="button" onClick={this.rehandlePost} className='admin-info-box-main-content-image-submit'>이미지 수정</button>
                                                        :
                                                        <button type="button" onClick={this.handlePost} className='admin-info-box-main-content-image-submit'>이미지 등록</button>
                                                    }
                                                    <br/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='admin-info-box-button'>
                                        {(this.props.match.params.eventSeq==='0') ?
                                            <Link to={'/admin/event'}><button className='admin-info-box-btn-cancel'>취소</button></Link>
                                            :
                                            <Link to={`/admin/event_edit/${this.props.match.params.eventSeq}`}><button className='admin-info-box-btn-cancel'>취소</button></Link>
                                        }
                                            <div>
                                                {!(this.props.match.params.eventSeq==='0') ?
                                                    <button onClick={this.reEventInfo} className='admin-info-box-btn-submit'>수정</button>
                                                    :
                                                    <button type="button" onClick={this.addEventInfo} className='admin-info-box-btn-submit'>등록</button>
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

export default withRouter(AdminEventEditPage);
