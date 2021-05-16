import React, {Component} from 'react'
import './notice.css'

class Notice extends Component{
    render(){
        return(
            <div className="notice">
                <div className="notice-subject">
                    <div className="notice-seq">번호</div>
                    <div className="notice-title">제목</div>
                    <div className="notice-date">등록일</div>
                </div>
                <div className="notice-content">
                    <div className="notice-seq">1</div>
                    <div className="notice-title">구매 전 필독 공지사항</div>
                    <div className="notice-date">2021-05-15</div>
                </div>
            </div>
        )
    }
}

export default Notice;