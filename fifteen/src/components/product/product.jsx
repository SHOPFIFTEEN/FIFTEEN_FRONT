import React, {Component} from 'react';
import './product.css';
import axios from "axios";
import Review from "../review/review";
import QnA from "../Q&A/Q&A";
import '../../pages/product/product_page.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import {getCookie, setCookie} from "../../cookies";
import {Link, withRouter} from "react-router-dom";
import Star from '../../img/star.svg';
import Modal from "react-awesome-modal";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productInfo: {productSeq: 12},
            count: 0,
            productSeq: '',
            keyword : 'field',
            AddressVisible: false
        }
    }

    getProductInfoList = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/product/${this.props.match.params.productSeq}`,
            data: {},
            headers: {
                "Content-Type": 'application/json'
            },
        })
        this.setState({productInfo: result.data[0]})
    }

    addCart = () => {
        let result = axios({
            method: 'POST',
            url: `http://52.79.196.94:3001/cart/add/${this.props.match.params.productSeq}`,
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": getCookie("accessToken"),
            },
            data: {
                count: this.state.count
            }
        }).then((result) => {
            if (result.status < 400) {
            }
        })
    }

    plusCount = () => {
        var c = this.state.count;
        this.setState({count: ++c});
    }
    minusCount = () => {
        var c = this.state.count;
        c = --c;
        if(c===0){
            alert('상품 수량은 1개 이상이어야 합니다.');
        }else{
            this.setState({count: --c});
        }
    }
    _openModal = function() {
        this.setState({
            AddressVisible : true
        });
    }

    _closeModal = function() {
        this.setState({
            AddressVisible : false
        });
    }


    componentDidMount() {
        this.setState({keyword : this.props.match.params.keyword})
        this.getProductInfoList();
    }


    render() {
        return (
            <div className="productPage">
                <Header/>
                <div className="ProductPage-main">
                    <div className="product">
                        {!(this.state.keyword === 'field') ?
                            <div className='breadCrumb'>'{this.props.match.params.keyword}' 검색 > {this.state.productInfo.title}</div> :
                            <div className='breadCrumb'>{this.state.productInfo.field} > {this.state.productInfo.title}</div>}
                        <div className="product-main">
                            <div className="product-main-imgBox">
                                <a href='#image'><img className="product-main-imgBox-img" src={this.state.productInfo.image}/></a>
                                <a href='#none'><div id="image" className='product-main-imgBox-popup'>
                                    <div className='product-main-imgBox-popup-box'>
                                        <img className="product-main-imgBox-popup-box-img" src={this.state.productInfo.image}/>
                                    </div>
                                </div></a>
                            </div>
                            <div className="product-main-box">
                                <div className="product-main-box-category">{this.state.productInfo.field}</div>
                                <div className="product-main-box-title">{this.state.productInfo.title}</div>
                                <div className="product-main-box-author">지은이 : {this.state.productInfo.author} / 출판사
                                    : {this.state.productInfo.publisher}</div>
                                <div className="product-main-box-comment">{this.state.productInfo.a_intro}</div>
                                <div className="product-main-box-price-total">Total</div>
                                <div className="product-main-box-price">{this.state.productInfo.price}원</div>
                                <div className="product-main-box-purchase">
                                    <div className="product-main-box-purchase-text"> {this.state.productInfo.title} | {this.state.productInfo.author}</div>
                                    <div className="product-main-box-purchase-btn" onClick={this.minusCount}>-</div>
                                    <div className="product-main-box-purchase-btnText">{this.state.count}</div>
                                    <div className="product-main-box-purchase-btn" onClick={this.plusCount}>+</div>
                                </div>
                                <div className="product-main-box-button">
                                    <Link to={`/purchase/${this.state.productInfo.productSeq}/${this.state.count}`}><button className="product-main-box-button-buy">BUY NOW</button></Link>
                                    <div className='product-main-box-button-popupBtn'>
                                   <a href='#cart_popup'> <button className="product-main-box-button-cart" onClick={this.addCart}>ADD TO
                                        CART
                                   </button></a>
                                    </div>
                                    <a href='#none'><div id="cart_popup" className='product-main-box-button-popup'>
                                        <div className='product-main-box-button-popup-box'>
                                            <div className='product-main-box-button-popup-box-text'>{this.state.productInfo.title}</div>
                                            <div className='product-main-box-button-popup-box-text'>{this.state.count} 개를 장바구니에 담았습니다!</div>
                                            <Link to="/wishlist"><button className='product-main-box-button-popup-box-btn'>장바구니 가기 </button></Link>
                                            <a href='#none' className='product-main-box-button-popup-box-btn'>계속 쇼핑하기 </a>
                                        </div>
                                    </div></a>
                                </div>
                            </div>
                        </div>
                        <div className="product-detail">
                            <div className="product-detail-sidenav">
                                <a href='#info'> <div className="product-detail-sidenav-information">information</div></a>
                                <a href="#review"> <div className="product-detail-sidenav-review">review</div></a>
                            </div>
                            <div className="product-detail-box">
                                <div id='info' className="product-detail-box-information">
                                    <div className="product-detail-box-information-box">
                                        <div className="product-detail-box-information-title">한줄 소개</div>
                                        {this.state.productInfo.a_intro}
                                    </div>
                                    <div className="product-detail-box-information-box">
                                        <div className="product-detail-box-information-title">작품 소개</div>
                                        {this.state.productInfo.content}
                                    </div>
                                    <div className="product-detail-box-information-box">
                                        <div className="product-detail-box-information-title">배송 방법</div>
                                        -상품 수령 후 7일 이내에 상품에 하자가 있을 시에 사용전에 고객센터로 연락주셔야만 교환 및 환불이 가능합니다. <br/>
                                        -고객센터에 반품요청을 하시거나, Q&A 게시판을 통해 반품요청해주세요. <br/>
                                        -고객님의 사용 또는 과실로 의해 상품의 가치가 감소한 경우에는 교환/반품이 불가능합니다.<br/>
                                        -상품에 대한 반품/교환 신청 절차 없이 임의로 택배를 반송 하거나, 배송지 착오로 인해 분실 된 경우에는 책임지지 않습니다.<br/>
                                        <br/>
                                        (자세한 내용은 고객센터를 이용해 주시기 바랍니다.)<br/>
                                        <br/>
                                        -상품 하자 이외 단순변심에 의한 교환, 반품의 경우 반송비는 고객님께서 부담하셔야 합니다. (색상 교환, 사이즈 교환 등 포함)<br/>
                                        -교환/반품비는 제품에 따라 상이 하오니 이점 유의하시기 바랍니다.<br/>
                                    </div>
                                </div>
                                <div className='product-detail-box-summary'>
                                    <div className='product-detail-box-summary-imgBox'>
                                        <img className='product-detail-box-summary-imgBox-img' src={this.state.productInfo.image} />
                                    </div>
                                    <div className='product-detail-box-summary-info1'>
                                        <div className='product-detail-box-summary-info-category'>{this.state.productInfo.field}</div>
                                        <div className='product-detail-box-summary-info-title'>{this.state.productInfo.title}</div>
                                        <div className='product-detail-box-summary-info-price'>{this.state.productInfo.price}원</div>
                                    </div>
                                    <div className='product-detail-box-summary-info2'>
                                        <div className='product-detail-box-summary-info-score'>
                                            <img className='product-detail-box-summary-info-starImg' src={Star}/>
                                            <div className='product-detail-box-summary-info-sub'>4.4 / 5.0 </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="review" className="product-detail-box-review">
                                    <div className="review-title">Review</div>
                                    <div className="review-text">감상평을 남겨주세요</div>
                                    <Review/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Product;