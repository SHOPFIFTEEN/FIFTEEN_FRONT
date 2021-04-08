import React, {Component} from 'react'
import './wishlist_page.css'
import Wishlist from '../../../src/components/wishlist/wishlist';
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import MyPage_side from '../../../src/components/MyPage_side/MyPage_side';

class WishlistPage extends Component{
    render(){
        return(
            <div>
                <div className="wishlistPage">
                    <Header />
                    <div className="wishlistPage_line" />
                    <div className="wishlistPage_title">Wishlist</div>
                    <div className="wishlistPage_main">
                        <MyPage_side />
                        <Wishlist />
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
export default WishlistPage;