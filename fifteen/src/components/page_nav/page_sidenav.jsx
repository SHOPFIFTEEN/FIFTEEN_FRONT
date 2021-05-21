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
                            <div className='pageNav-category-box'>
                                <Link to='/address_edit'><div className='pageNav-category-address'>배송지 수정</div></Link>
                                <Link to='/address_post'><div className='pageNav-category-address'>배송지 추가</div></Link>
                            </div>
                        </div>
                        <Link to='/wishlist'><div className="pageNav-category-text">관심상품</div></Link>
                        <Link to='/coupon'><div className="pageNav-category-text">쿠폰</div></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(PageSideNav);