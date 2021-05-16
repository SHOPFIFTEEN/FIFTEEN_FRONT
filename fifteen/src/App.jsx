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
import ListPage from "./pages/list/ListPage";
import AdminProduct from "./pages/admin/admin_product";
import Search from "./pages/search/searchPage";
import Product from "./components/product/product";
<<<<<<< HEAD
import AdminEvent from "./pages/admin/admin_event";
import AdminNotice from "./pages/admin/admin_notice";
import NoticePage from "./pages/notice/notice_page";
import EventPage from "./pages/notice/event_page";
=======
>>>>>>> b24c7a503782a2bd5c79b8f558fa467cfbf1c4b5

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
                <Route path='/list' component={ListPage}/>
                <Route path='/admin/product' component={AdminProduct}/>
                <Route path='/admin/event' component={AdminEvent}/>
                <Route path='/admin/notice' component={AdminNotice}/>
                <Route path='/product/:productSeq' component={Product}/>
                <Route path='/search/:keyword' component={Search}/>
                <Route path='/notice' component={NoticePage} />
                <Route path='/event' component={EventPage} />
            </div>
        );
    }
}

export default (App);
