import React, {Component} from 'react';
import './page_sidenav.css';
import {Link, withRouter} from "react-router-dom";
import {deleteCookie, getCookie} from "../../cookies";
import axios from "axios";

class AdminNav extends Component {
    constructor(p) {
        super(p);
        this.state={
            token : undefined,
            userSeq : undefined,
            userName: undefined,
            products : [{'productSeq' : '1'}],
            productSeq : 0
        }
    }
    getBookList = async function () {
        let result = await axios({
            method: 'GET',
            url: 'http://52.79.196.94:3001/product',
            data: {},
            headers: {
                "Content-Type": 'application/json'
            },
        });
        this.setState({products: result.data});
        if (this.props.match.params.field === '전체') {
            this.setState({fieldProducts: this.state.products});
        } else {
            console.log(this.props.match.params.field);
            let result1 = await axios({
                method: 'GET',
                url: `http://52.79.196.94:3001/product/category/${this.props.match.params.field}`,
                data: {},
                headers: {
                    "Content-Type": 'application/json'
                },
            })
            this.setState({fieldProducts: result1.data});
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
        });
        this.getBookList();
    }
    render(){
        return(
            <div>
                <div className="pageNav">
                    <div className="pageNav-category">
                        <div className="pageNav-category-text"><Link to='/admin/product'>상품 관리</Link>
                            <div className='pageNav-category-box'>
                                <Link to={`/admin/product_post/${this.state.productSeq}`}><div className='pageNav-category-address'>상품 추가</div></Link>
                            </div>
                        </div>
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