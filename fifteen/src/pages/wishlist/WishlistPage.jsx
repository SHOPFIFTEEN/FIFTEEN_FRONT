import React, {Component} from 'react';
import './wishlistPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/MyPageSide/page_sidenav';
import {withRouter} from "react-router-dom";
import {getCookie} from "../../cookies";
import axios from "axios";

class WishlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [{}]
        }
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
        console.log(result.data);
    };

    deleteCart = async function (e) {
        console.log(e.data.cartSeq);
        let result =await axios ({
            method : 'DELETE',
            url : `http://52.79.196.94:3001/cart/ki/`,
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
        });
    };


    componentDidMount() {
        this.getCart();
    }

    renderProducts = () => {
        const {products} = this.state;
        return products.map(arr => (
            <div key={arr.productSeq}>
                <div className="wishlist_box">
                    <input type='checkbox'
                           name='wishlist'
                           className="wishlist_box_check"/>
                    <div className="list-product-item-imageBox">
                        <img className="list-product-item-imageBox-img" src={arr.image} />
                    </div>
                    <div className="wishlist_box_title">{arr.title}</div>
                    <div className="wishlist_box_count">{arr.count}</div>
                    <div className="wishlist_box_price">{arr.price}</div>
                    <div onClick={this.deleteCart}>X</div>
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
                                <input type='checkbox'
                                       name='wishlist'
                                       className="wishlist_theme_check"/>
                                <div className="wishlist_theme_img">이미지</div>
                                <div className="wishlist_theme_title">상품정보</div>
                                <div className="wishlist_theme_count">수량</div>
                                <div className="wishlist_theme_price">판매가</div>
                            </div>

                            {renderProducts}
                            <div className="wishlist_button">
                                <button className="wishlist_button_delete">삭제</button>
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