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
import admin_event from "./pages/admin/admin_event";
import admin_notice from "./pages/admin/admin_notice";
import EventPage from "./pages/notice/event_page";
import NoticePage from "./pages/notice/notice_page";
import NoticeDetail from "./pages/notice_detail/NoticeDetail";
import EventDetail from "./pages/notice_detail/EventDetail";
import AdminNoticeEdit from "./pages/admin_edit/AdminNoticeEdit";
import AdminEventEdit from "./pages/admin_edit/AdminEventEdit";
import AdminNoticePost from "./pages/admin_post/AdminNoticePost";
import AdminEventPost from "./pages/admin_post/AdminEventPost";
import AdminEventEditPage from "./pages/admin_edit/AdminEventEditPage";
import AdminNoticeEditPage from "./pages/admin_edit/AdminNoticeEditPage";
import AdminProductEdit from "./pages/admin_product/AdminProductEdit";
import AdminProductPost from "./pages/admin_product/AdminProductPost";
import PurchasePage from "./pages/purchase/PurchasePage";
import AddressPage from "./pages/addressPage/AddressPage";
import AddressPost from "./pages/addressPage/AddressPost";
import AddressEdit from "./pages/addressPage/AddressEdit";


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
                <Route path='/list/:field' component={ListPage}/>
                <Route path='/admin/product' component={AdminProduct}/>
                <Route path='/admin/event' component={admin_event}/>
                <Route path='/admin/notice' component={admin_notice}/>
                <Route path='/product/:productSeq/:keyword' component={Product}/>
                <Route path='/search/:keyword' component={Search}/>
                <Route path='/notice' component={NoticePage} />
                <Route path='/notice_detail/:noticeSeq' component={NoticeDetail} />
                <Route path='/event' component={EventPage} />
                <Route path='/event_detail' component={EventDetail} />
                <Route path='/admin/event_post/:eventSeq' component={AdminEventPost}/>
                <Route path='/admin/event_edit/:eventSeq' component={AdminEventEdit}/>
                <Route path='/admin/notice_post/:noticeSeq' component={AdminNoticePost}/>
                <Route path='/admin/notice_edit/:noticeSeq' component={AdminNoticeEdit}/>
                <Route path='/admin/notice_edit_page/:noticeSeq' component={AdminNoticeEditPage}/>
                <Route path='/admin/event_edit_page/:eventSeq' component={AdminEventEditPage}/>
                <Route path='/admin/product_edit/:productSeq' component={AdminProductEdit}/>
                <Route path='/admin/product_post/:productSeq' component={AdminProductPost}/>
                <Route path='/purchase' component={PurchasePage} />
                <Route path='/address' component={AddressPage}/>
                <Route path='/address_post' component={AddressPost}/>
                <Route path='/address_edit/:delSeq' component={AddressEdit}/>
            </div>
        );
    }
}

export default (App);
