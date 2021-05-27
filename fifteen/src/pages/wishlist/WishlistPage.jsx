import React, {Component} from 'react';
import './wishlistPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/page_nav/page_sidenav';
import {withRouter, Link} from "react-router-dom";
import {getCookie, setCookie} from "../../cookies";
import axios from "axios";
import _ from 'lodash';

class WishlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [{}],
            sum : 0,
            change : 0,
            keyword : 'field'
        }
    }

    deleteCart = async function (e) {
        let result =await axios ({
            method : 'DELETE',
            url : `http://52.79.196.94:3001/cart/ki/${e}`,
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
        }).then((result)=> {
            if (result.status < 400) {
                alert('삭제되었습니다.');
            }
        })
        this.setState({change : 1});
    };

    reCart = async function (cartSeq, cartCount, setCount) {
        var count = setCount;
        if(cartCount===1){
            count = count - 1;
            if(count === 0){
                alert('수량이 1보다 작습니다.');
                count ++;
            }
        }else {
            count = count + 1;
        }
        console.log(cartSeq);
        let result = await axios ({
            method : 'POST',
            url : `http://52.79.196.94:3001/cart/re/${cartSeq}`,
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
            data : {
                count : count
            }
        })
        this.setState({change : 1});
    }

    getCart = async function () {
        let result =await axios ({
            method : 'GET',
            url : `http://52.79.196.94:3001/cart`,
            data: { },
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
        });
        this.setState({products : result.data});
        let sum = _.sumBy(result.data, function(o){return o.count*o.price});
        this.setState({sum : sum});
    };

    componentDidMount() {
        this.getCart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.change===1){
            this.getCart();
            this.setState({change : 0});
        }
    }

    renderProducts = () => {
        const {products} = this.state;
        return products.map(arr => (
            <div key={arr.productSeq}>
                <div className="wishlist_box">
                    <input type='checkbox'
                           name='wishlist'
                           className="wishlist_box_check"/>
                    <div className="wishlist_box-imageBox">
                    <Link to={`/product/${arr.productSeq}/${this.state.keyword}`}>
                            <img className="wishlist_box_img" src={arr.image} />
                    </Link>
                    </div>
                    <Link to={`/product/${arr.productSeq}/${this.state.keyword}`}>
                        <div className="wishlist_box_title">{arr.title}</div>
                    </Link>
                    <div className="wishlist_minus" onClick={()=>this.reCart(arr.cartSeq, 1, arr.count)}>-</div>
                    <div className="wishlist_box_count">{arr.count}</div>
                    <div className="wishlist_plus" onClick={()=>this.reCart(arr.cartSeq, 2,  arr.count)}>+</div>
                    <div className="wishlist_box_price">{arr.price}</div>
                    <div className='wishlist_theme_x' onClick={()=> {this.deleteCart(arr.cartSeq);}}>X</div>
                </div>
            </div>
        ))
    }

    render() {

        const renderProducts = this.renderProducts();

        return (
            <div>
                <div className="wishlistPage">
                    <Header/>
                    <div className="wishlistPage_line"/>
                    <div className="wishlistPage_title">Cart</div>
                    <div className="wishlistPage_main">
                        <MyPageSide/>
                        <div className="wishlist">
                            <div className="wishlist_theme">
                                <div className="wishlist_theme_check"/>
                                <div className="wishlist_theme_img">이미지</div>
                                <div className="wishlist_theme_title">상품정보</div>
                                <div className="wishlist_theme_count">수량</div>
                                <div className="wishlist_theme_price">판매가</div>
                                <div className="wishlist_theme_x">삭제</div>
                            </div>
                            {renderProducts}

                            <div className="wishlist_bottom_box">
                                <div className="wishlist_sum">총 결제가격 : {this.state.sum}</div>
                                <Link to={`/cartPurchase`}>
                                    <div className="wishlist_buy_btn">결제</div>
                                </Link>
                            </div>
                            <div className="wishlist_button">
                                <div className="wishlist_paging">
                                    <button className="wishlist_paging_before">&lt;</button>
                                    <button className="wishlist_paging_this">1</button>
                                    <button className="wishlist_paging_after">&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default withRouter(WishlistPage);