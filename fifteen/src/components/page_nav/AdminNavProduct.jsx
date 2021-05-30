import React, {Component} from 'react';
import './page_sidenav.css';
import {Link, withRouter} from "react-router-dom";
import axios from "axios";

class AdminNavProduct extends Component {
    render(){

        return(
            <div>
                <div className="pageNav">
                    <div className="pageNav-category">
                        <div className="pageNav-category-text">Information 수정</div>
                        <Link to='/admin/product_review'><div className="pageNav-category-text">Review 관리</div></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AdminNavProduct);