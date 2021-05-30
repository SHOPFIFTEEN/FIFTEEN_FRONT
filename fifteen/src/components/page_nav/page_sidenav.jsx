import React, {Component} from 'react';
import './page_sidenav.css';
import {Link, withRouter} from "react-router-dom";

class PageSideNav extends Component {
    render(){
        return(
            <div>
                <div className="pageNav">
                    <div className="pageNav-category">
                        <Link to='/order_page'><div className="pageNav-category-text">주문내역조회</div></Link>
                        <Link to='/profile'><div className="pageNav-category-text">회원정보</div></Link>
                        <div className='pageNav-category-text'><Link to='/address'>배송지 관리</Link>
                        </div>
                        <Link to='/question'><div className="pageNav-category-text">문의내역</div></Link>
                        <Link to='/wishlist'><div className="pageNav-category-text">장바구니</div></Link>
                        <Link to='/coupon'><div className="pageNav-category-text">쿠폰</div></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(PageSideNav);