import React, {Component} from 'react'
import './notice.css'

class Event extends Component{
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
                    <div className="notice-title">내 생일^ㅁ^</div>
                    <div className="notice-date">2021-01-06</div>
                </div>
            </div>
        )
    }
}

export default Event;