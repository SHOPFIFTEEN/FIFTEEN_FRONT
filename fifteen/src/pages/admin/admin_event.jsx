import React, {Component} from 'react';
import './admin_product.css';
import {withRouter, Link} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";
import styles from "../../components/header/header.module.css";
import Search from "../../img/search.svg";
import {getCookie} from "../../cookies";


class AdminEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events : [{'eventSeq':'1'}],
            eventSeq : 0,
            change : 0,
            keyword : '',
            currentPage: 1,
            postsPerPage: 5,
            pageNumbers: [],
            pN : []
        }
    }

    getEvent= async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:3001/event',
            data: { },
            headers : {
                'Access-Control-Allow-Origin' : '*',
                "Content-Type" : 'application/json'
            },
        })
        this.setState({events: result.data});
        var pageNumbers= [];
        for(let i =1; i<=Math.ceil(this.state.events.length/this.state.postsPerPage); i++){
            pageNumbers.push({'num' : i});
        }
        this.setState ({pN : pageNumbers});
    }
    currentPosts(tmp) {
        var indexOfLast = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirst = indexOfLast - this.state.postsPerPage;
        let currentPosts = 0;
        currentPosts = _.slice(tmp,indexOfFirst, indexOfLast);
        console.log(currentPosts);
        return currentPosts;
    }
    pagination=(e)=> {
        this.setState({currentPage : e});
    }

    postActive=(e)=> {
        var thisOb = _.find(this.state.events,{'eventSeq' : e});
        if(thisOb.active===1){
            thisOb.active=0
        }else{
            thisOb.active=1
        }
        let result = axios ({
            method : 'POST',
            url : `http://52.79.196.94:3001/event/active/${e}`,
            data: {
                active : thisOb.active
            },
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken")
            },
        })
        this.setState({
            change : 1
        })
    }

    alert=()=> {
        alert('검색어를 입력해주세요');
    }

    search = async ()=> {
        let result = await axios({
            method : 'GET',
            url : `http://52.79.196.94:3001/search/event/${this.state.keyword}`,
            data: {},
            headers : {
                "Content-Type" : 'application/json',
            },
        })

        this.setState({events : result.data});
    }

    handleChangeKeyword = (e) => {
        this.setState({keyword: e.target.value})
    }

    componentDidMount() {
        this.getEvent();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.change!==this.state.change){
            this.getEvent();
            this.setState({change : 0})
        }
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
                                <input type="text" name='search' onChange={this.handleChangeKeyword} className='admin-searchBox-box'/>
                                {!(this.state.keyword)?  <img onClick={this.alert} src={Search} className='admin-searchBox-img'/>:
                                        <img src={Search} onClick={()=>this.search()} className='admin-searchBox-img'/>
                                }
                            </div>
                            <div className="admin-event-title">
                                <div className="admin-event-title-text">이벤트 관리</div>
                                <div className='admin-event-title-btn'>
                                    <button className="admin-event-title-recent">최신순</button>
                                    <Link to={`/admin/event_edit_page/${this.state.eventSeq}`}>
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
                            {this.currentPosts(this.state.events).map(arr=>(
                                <div key={arr.eventSeq}>
                                    <div className="admin-event-table">
                                        <div className='admin-event-table-btnBox'>
                                            <input type='checkbox' className='admin-event-table-check' onClick={()=>this.postActive(arr.eventSeq)} checked={arr.active}/>
                                        </div>
                                    <Link to={`/admin/event_edit/${arr.eventSeq}`}>
                                        <div className="admin-event-table">
                                            <div className="admin-event-table-content">{arr.title}</div>
                                            <div className="admin-event-table-term">{arr.start_date} ~ {arr.end_date}</div>
                                            <div className="admin-event-table-button">
                                                <Link to={`/admin/event_edit_page/${arr.eventSeq}`}>
                                                    <button className="admin-event-table-button-modify">수정</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                    </div>
                                </div>
                            ))}
                            <div className='page-num-box-admin-notice'>
                                {this.state.pN.map(arr=> (
                                    <button className='page-num' key={arr.num} onClick={()=>this.pagination(arr.num)}>{arr.num}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminEvent);
