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
import _ from "lodash";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productInfo: {productSeq: 12},
            count: 0,
            productSeq: '',
            keyword : 'field',
            AddressVisible: false,
            scoreAverage : 0
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

    getReview = async function () {
        let result = await axios({
            method: 'GET',
            url: `http://52.79.196.94:3001/review/${this.props.match.params.productSeq}`,
            data: {},
            headers: {
                "Content-Type": 'application/json',
            },
        })
        var ave = _.meanBy(result.data, 'score');
        this.setState({
            scoreAverage: ave
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
            alert('?????? ????????? 1??? ??????????????? ?????????.');
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
        this.getReview();
    }


    render() {
        return (
            <div className="productPage">
                <Header/>
                <div className="ProductPage-main">
                    <div className="product">
                        {!(this.state.keyword === 'field') ?
                            <div className='breadCrumb'>'{this.props.match.params.keyword}' ?????? > {this.state.productInfo.title}</div> :
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
                                <div className="product-main-box-author">????????? : {this.state.productInfo.author} / ?????????
                                    : {this.state.productInfo.publisher}</div>
                                <div className="product-main-box-comment">{this.state.productInfo.a_intro}</div>
                                <div className="product-main-box-price-total">Total</div>
                                <div className="product-main-box-price">{this.state.productInfo.price}???</div>
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
                                            <div className='product-main-box-button-popup-box-text'>{this.state.count} ?????? ??????????????? ???????????????!</div>
                                            <Link to="/wishlist"><button className='product-main-box-button-popup-box-btn'>???????????? ?????? </button></Link>
                                            <a href='#none' className='product-main-box-button-popup-box-btn'>?????? ???????????? </a>
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
                                        <div className="product-detail-box-information-title">?????? ??????</div>
                                        {this.state.productInfo.a_intro}
                                    </div>
                                    <div className="product-detail-box-information-box">
                                        <div className="product-detail-box-information-title">?????? ??????</div>
                                        {this.state.productInfo.content}
                                    </div>
                                    <div className="product-detail-box-information-box">
                                        <div className="product-detail-box-information-title">?????? ??????</div>
                                        -?????? ?????? ??? 7??? ????????? ????????? ????????? ?????? ?????? ???????????? ??????????????? ?????????????????? ?????? ??? ????????? ???????????????. <br/>
                                        -??????????????? ??????????????? ????????????, Q&A ???????????? ?????? ????????????????????????. <br/>
                                        -???????????? ?????? ?????? ????????? ?????? ????????? ????????? ????????? ???????????? ??????/????????? ??????????????????.<br/>
                                        -????????? ?????? ??????/?????? ?????? ?????? ?????? ????????? ????????? ?????? ?????????, ????????? ????????? ?????? ?????? ??? ???????????? ???????????? ????????????.<br/>
                                        <br/>
                                        (????????? ????????? ??????????????? ????????? ????????? ????????????.)<br/>
                                        <br/>
                                        -?????? ?????? ?????? ??????????????? ?????? ??????, ????????? ?????? ???????????? ??????????????? ??????????????? ?????????. (?????? ??????, ????????? ?????? ??? ??????)<br/>
                                        -??????/???????????? ????????? ?????? ?????? ????????? ?????? ??????????????? ????????????.<br/>
                                    </div>
                                </div>
                                <div className='product-detail-box-summary'>
                                    <div className='product-detail-box-summary-imgBox'>
                                        <img className='product-detail-box-summary-imgBox-img' src={this.state.productInfo.image} />
                                    </div>
                                    <div className='product-detail-box-summary-info1'>
                                        <div className='product-detail-box-summary-info-category'>{this.state.productInfo.field}</div>
                                        <div className='product-detail-box-summary-info-title'>{this.state.productInfo.title}</div>
                                        <div className='product-detail-box-summary-info-price'>{this.state.productInfo.price}???</div>
                                    </div>
                                    <div className='product-detail-box-summary-info2'>
                                        <div className='product-detail-box-summary-info-score'>
                                            <img className='product-detail-box-summary-info-starImg' src={Star}/>
                                            <div className='product-detail-box-summary-info-sub'>{this.state.scoreAverage} / 5.0 </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="review" className="product-detail-box-review">
                                    <div className="review-title">Review</div>
                                    <div className="review-text">???????????? ???????????????</div>
                                    <Review productSeq={this.props.match.params.productSeq}/>
                                </div>
                                <div id='qna' className="product-detail-box-review">
                                    <div className="review-title">Q&A</div>
                                    <div className="review-text">????????? ???????????????</div>
                                    <QnA productSeq={this.props.match.params.productSeq} />
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