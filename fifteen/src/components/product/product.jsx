import React, {Component} from 'react'
import './product.css';
import axios from "axios";
import Review from "../review/review";

class Product extends Component{

        constructor(props) {
            super(props);
            this.state = {
                productInfoArr: [{'productSeq': '1'}]
            }
        }
        getProductInfoList = async function () {
            let result =await axios ({
                method : 'GET',
                url : 'http://13.125.235.86:8080/product/select_all',
                data: { },
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    "Content-Type" : 'application/json'
                },
            });
            this.setState({productInfoArr : result.data});
        };

        componentDidMount() {
            this.getProductInfoList();
        }
    render(){
        return(
            <div className="product">
                <div className="product-main">
                    <div className="product-main-imgBox">
                        <img className="product-main-imgBox-img" src={this.state.productInfoArr[0].image}/></div>
                    <div className="product-main-box">
                        <div className="product-main-box-category">{this.state.productInfoArr[0].field}</div>
                        <div className="product-main-box-title">{this.state.productInfoArr[0].title}</div>
                        <div className="product-main-box-author">지은이 : {this.state.productInfoArr[0].author} / 출판사 : {this.state.productInfoArr[0].publisher}</div>
                        <div className="product-main-box-comment">{this.state.productInfoArr[0].a_intro}</div>
                        <div className="product-main-box-price-total">Total</div>
                        <div className="product-main-box-price">{this.state.productInfoArr[0].price}원</div>
                        <div className="product-main-box-button">
                            <button className="product-main-box-button-buy">BUY NOW</button>
                            <button className="product-main-box-button-cart">ADD TO CART</button>
                            <button className="product-main-box-button-heart"/>
                        </div>
                </div>
                </div>
                <div className="product-detail">
                    <div className="product-detail-sidenav">
                        <div className="product-detail-sidenav-information">information</div>
                        <div className="product-detail-sidenav-review">review</div>
                        <div className="product-detail-sidenav-qna">Q&A</div>
                    </div>
                    <div className="product-detail-box">
                        <div className="product-detail-box-information">
                            <div className="product-detail-box-information-box">
                                <div className="product-detail-box-information-title">저자 소개</div>
                                {this.state.productInfoArr[0].a_intro}
                            </div>
                            <div className="product-detail-box-information-box">
                                <div className="product-detail-box-information-title">작품 소개</div>
                                {this.state.productInfoArr[0].content}
                            </div>
                            <div className="product-detail-box-information-box">
                                <div className="product-detail-box-information-title">배송 방법</div>
                                -상품 수령 후 7일 이내에 상품에 하자가 있을 시에 사용전에 고객센터로 연락주셔야만 교환 및 환불이 가능합니다. <br/>
                                -고객센터에 반품요청을 하시거나, Q&A 게시판을 통해 반품요청해주세요. <br />
                                -고객님의 사용 또는 과실로 의해 상품의 가치가 감소한 경우에는 교환/반품이 불가능합니다.<br />
                                -상품에 대한 반품/교환 신청 절차 없이 임의로 택배를 반송 하거나, 배송지 착오로 인해 분실 된 경우에는 책임지지 않습니다.<br/>
                                <br />
                                (자세한 내용은 고객센터를 이용해 주시기 바랍니다.)<br/>
                                <br />
                                -상품 하자 이외 단순변심에 의한 교환, 반품의 경우 반송비는 고객님께서 부담하셔야 합니다. (색상 교환, 사이즈 교환 등 포함)<br />
                                -교환/반품비는 제품에 따라 상이 하오니 이점 유의하시기 바랍니다.<br />
                            </div>
                        </div>
                        <div className="product-detail-box-review">

                        </div>
                        <div className="product-detail-box-qna">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Product;