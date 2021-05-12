import React, {Component} from 'react';
import './page_sidenav.css';
import {Link, withRouter} from "react-router-dom";

class PageSideNav extends Component {
    render(){
        return(
            <div>
                <div className="pageNav">
                    <div className="pageNav-category">
                        <div className="pageNav-category-text">주문내역조회</div>
                        <Link to='/profile'><div className="pageNav-category-text">회원정보</div></Link>
                        <Link to='/wishlist'><div className="pageNav-category-text">관심상품</div></Link>
                        <Link to='/coupon'><div className="pageNav-category-text">쿠폰</div></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(PageSideNav);