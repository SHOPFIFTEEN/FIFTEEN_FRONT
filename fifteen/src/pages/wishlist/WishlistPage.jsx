import React, {Component} from 'react';
import './wishlistPage.css';
import Header from '../../../src/components/header/Header';
import Footer from '../../components/footer/Footer';
import MyPageSide from '../../components/MyPageSide/page_sidenav';
import {withRouter} from "react-router-dom";

class WishlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    productSeq: 1,
                    title: '나는 더미야_1',
                    image: '나중추가',
                    author: 'dummy dum',
                    price: '13,000',
                    publisher: '애웅출판사'
                },
                {
                    productSeq: 2,
                    title: '나는 더미야_2',
                    image: '나중추가',
                    author: 'dummy dum',
                    price: '13,000',
                    publisher: '애웅출판사'
                },
                {
                    productSeq: 3,
                    title: '나는 더미야_3',
                    image: '나중추가',
                    author: 'dummy dum',
                    price: '13,000',
                    publisher: '애웅출판사'
                },
                {
                    productSeq: 4,
                    title: '나는 더미야_4',
                    image: '나중추가',
                    author: 'dummy dum',
                    price: '13,000',
                    publisher: '애웅출판사'
                },
                {
                    productSeq: 5,
                    title: '나는 더미야_5',
                    image: '나중추가',
                    author: 'dummy dum',
                    price: '13,000',
                    publisher: '애웅출판사'
                }
            ]
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
                    <div className="wishlist_box_img">{arr.image}</div>
                    <div className="wishlist_box_title">{arr.title}</div>
                    <div className="wishlist_box_price">{arr.price}</div>
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
                    <div className="wishlistPage_title">Wishlist</div>
                    <div className="wishlistPage_main">
                        <MyPageSide/>
                        <div className="wishlist">
                            <div className="wishlist_theme">
                                <input type='checkbox'
                                       name='wishlist'
                                       className="wishlist_theme_check"/>
                                <div className="wishlist_theme_img">이미지</div>
                                <div className="wishlist_theme_title">상품정보</div>
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