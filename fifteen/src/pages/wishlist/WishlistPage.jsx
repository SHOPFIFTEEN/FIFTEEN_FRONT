import React, {Component} from 'react';
import './wishlistPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/MyPageSide/page_sidenav';
import {withRouter} from "react-router-dom";
import {getCookie, setCookie} from "../../cookies";
import axios from "axios";

class WishlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [{}],
            change : 0
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
        this.setState({change : this.state.change + 1});
    };

    reCart = async function (cartSeq, cartCount, e) {
        var count = cartCount;
        if(e===1){
            count = count + 1;
        }else{
            count = count - 1;
        }
        let result = await axios ({
            method : 'POST',
            url : `http://52.79.196.94:3001/cart/ki/${cartSeq}`,
            headers : {
                "Content-Type" : 'application/json',
                "x-access-token" : getCookie("accessToken"),
            },
            data : {
                count : count
            }
        })
        this.setState({change : this.state.change + 1});
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
    };

    componentDidMount() {
        this.getCart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.change!==this.state.change){
            this.getCart();
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
                    <div className="list-product-item-imageBox">
                        <img className="list-product-item-imageBox-img" src={arr.image} />
                    </div>
                    <div className="wishlist_box_title">{arr.title}</div>
                    <div onClick={this.reCart(arr.cartSeq, arr.count, 0)}>-</div>
                    <div className="wishlist_box_count">{arr.count}</div>
                    <div onClick={this.reCart(arr.cartSeq, arr.count, 1)}>+</div>
                    <div className="wishlist_box_price">{arr.price}</div>
                    <div onClick={()=> {this.deleteCart(arr.cartSeq);}}>X</div>
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