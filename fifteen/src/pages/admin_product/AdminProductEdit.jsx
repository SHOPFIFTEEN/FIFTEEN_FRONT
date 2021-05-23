import React, {Component} from 'react';
import '../admin/admin_product.css';
import  './adminProductEdit.css';
import {withRouter, Link} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNavProduct from "../../components/page_nav/AdminNavProduct";
import Review from "../../components/review/review";
import QnA from "../../components/Q&A/Q&A";
import {getCookie} from "../../cookies";
import AdminNav from "../../components/page_nav/admin_nav";
import styles from "../../components/header/header.module.css";


class AdminProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productInfo : [],
        }
    }

    getProductInfo = async function() {
        let result =await axios ({
            method : 'GET',
            url : `http://52.79.196.94:3001/product/${this.props.match.params.productSeq}`,
            data: { },
            headers : {
                "Content-Type" : 'application/json'
            },
        })
        this.setState({productInfo : result.data[0]});
    }

    deleteProductInfo =()=> {
        var response = window.confirm('삭제하시겠습니까?');
        if(response){
            let result = axios ({
                method : 'DELETE',
                url : `http://52.79.196.94:3001/product/ki/${this.props.match.params.productSeq}`,
                headers : {
                    "Content-Type" : 'application/json',
                    'x-access-token' : getCookie("accessToken")
                },
            }).then((result)=>{
                if(result.status<400){
                    const {history} = this.props;
                    alert('삭제되었습니다.');
                    history.push('/admin/product');

                }}
            )
        }else{
            alert('삭제를 취소하였습니다.');
        }
    }

    componentDidMount() {
        this.getProductInfo();
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
                        <div className='admin-nav'>
                            <AdminNavProduct />
                            <div className='admin-nav-padding'/>
                            <AdminNav />
                        </div>
                        <div className='admin-productEdit-info'>
                            <div className="admin-productEdit-info-titleBox">
                                <div className="admin-productEdit-info-title-text">Information 수정</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>카테고리</div>
                                <div className='admin-productEdit-info-category'>{this.state.productInfo.field}</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>제목</div>
                                <div className='admin-productEdit-info-title'>{this.state.productInfo.title}</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>출판사</div>
                                <div className='admin-productEdit-info-publisher'>{this.state.productInfo.publisher}</div>

                            </div>
                            <div className='admin-productEdit-info-box'>

                                <div className='admin-productEdit-info-subject'>지은이</div>
                                <div className='admin-productEdit-info-author'>{this.state.productInfo.author}</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>가격</div>
                                <div className='admin-productEdit-info-price'>{this.state.productInfo.price}</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>수량</div>
                                <div className='admin-productEdit-info-cnt'>{this.state.productInfo.count}</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>가제</div>
                                <div className='admin-productEdit-info-authorIntro'>{this.state.productInfo.a_intro}</div>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>작품 소개</div>
                                <div className='admin-productEdit-info-intro'>{this.state.productInfo.content}</div>
                            </div>
                                    <div className='admin-productEdit-info-box'>
                                    <div className='admin-productEdit-info-subject'>배송비</div>
                                    <div className='admin-productEdit-info-intro'>{this.state.productInfo.delivery}</div>
                                    </div>
                                    <div className='admin-productEdit-info-box'>
                                    <div className='admin-productEdit-info-subject'>마일리지</div>
                                    <div className='admin-productEdit-info-intro'>{this.state.productInfo.mileage}</div>
                                    </div>
                                    <div className='admin-productEdit-info-box'>
                                    <div className='admin-productEdit-info-subject'>페이지 수</div>
                                    <div className='admin-productEdit-info-intro'>{this.state.productInfo.page}</div>
                                    </div>
                                    <div className='admin-productEdit-info-box'>
                                    <div className='admin-productEdit-info-subject'>출간일</div>
                                    <div className='admin-productEdit-info-intro'>{this.state.productInfo.p_date}</div>
                                    </div>
                                    <div className='admin-productEdit-info-box'>
                                    <div className='admin-productEdit-info-subject'>할인율</div>
                                    <div className='admin-productEdit-info-intro'>{this.state.productInfo.discount}</div>
                                    </div>
                                    <div className='admin-productEdit-info-box'>
                                    <div className='admin-productEdit-info-subject'>이미지</div>
                                    <img src={this.state.productInfo.image} width='500px' height='500px'/>
                                    </div>
                            <div className='admin-info-box-button'>
                                <Link to={`/admin/product`}>
                                    <button className='admin-info-box-btn-cancel'>취소</button>
                                </Link>
                                <Link to={`/admin/product_post/${this.props.match.params.productSeq}`}>
                                    <button className='admin-info-box-btn-submit'>수정</button>
                                </Link>
                                <Link to={`/admin/product`}>
                                    <button onClick={this.deleteProductInfo} className='admin-info-box-btn-cancel'>삭제</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminProductInfo);
