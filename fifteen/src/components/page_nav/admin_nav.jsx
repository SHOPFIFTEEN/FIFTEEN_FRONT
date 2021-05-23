import React, {Component} from 'react';
import './page_sidenav.css';
import {Link, withRouter} from "react-router-dom";
import {deleteCookie, getCookie} from "../../cookies";

class AdminNav extends Component {
    constructor(p) {
        super(p);
        this.state={
            token : undefined,
            userSeq : undefined,
            userName: undefined
        }
    }

    logout=()=> {
        const {history} = this.props;
        deleteCookie("accessToken");
        deleteCookie("userSeq");
        deleteCookie("userName");
        this.setState({
            token : undefined
        });
        alert('로그아웃 되었습니다.');
        history.push('/');
    }

    componentDidMount(){
        this.setState({
            token : getCookie("accessToken"),
            userSeq : getCookie("userSeq"),
            userName : getCookie("userName")
        })
    }
    render(){
        return(
            <div>
                <div className="pageNav">
                    <div className="pageNav-category">
                        <Link to='/admin/product'><div className="pageNav-category-text">상품 관리</div></Link>
                        <Link to='/admin/notice'><div className="pageNav-category-text">공지 관리</div></Link>
                        <Link to='/admin/event'><div className="pageNav-category-text">이벤트 관리</div></Link>
                        <div className="pageNav-category-text" onClick={this.logout}>로그아웃</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AdminNav);