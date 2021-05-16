import React, {Component} from 'react';
import './page_sidenav.css';
import {Link, withRouter} from "react-router-dom";

class AdminNav extends Component {
    render(){
        return(
            <div>
                <div className="pageNav">
                    <div className="pageNav-category">
                        <Link to='/admin/product'><div className="pageNav-category-text">상품 관리</div></Link>
                        <Link to='/admin/notice'><div className="pageNav-category-text">공지 관리</div></Link>
                        <Link to='/admin/event'><div className="pageNav-category-text">이벤트 관리</div></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AdminNav);