import React, {Component} from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {Route, withRouter} from 'react-router-dom';
import Index from './pages/index';
import Login from './pages/login/LoginPage';
import Join from './pages/join/JoinPage';
import OrderPage from './pages/order/OrderPage';
import MyPage from './pages/mypage/MyPage';
import Profile from './pages/profile/ProfilePage';
import Wishlist from "./pages/wishlist/WishlistPage";
import Coupon from './pages/coupon/CouponPage';
import ProductPage from "./pages/product/product_page";

class App extends Component{
    render() {
        return (
            <div className="App">
                <Route path='/' component={Index} exact/>
                <Route path='/login' component={Login}/>
                <Route path='/join' component={Join}/>
                <Route path='/order_page' component={OrderPage} />
                <Route path='/myPage' component={MyPage}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/wishlist' component={Wishlist}/>
                <Route path='/coupon' component={Coupon}/>
                <Route path='/product/:productSeq' component={ProductPage}/>
            </div>
        );
    }
}

export default (App);
