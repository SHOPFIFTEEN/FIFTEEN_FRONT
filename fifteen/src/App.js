import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {Route} from 'react-router-dom';
import Index from './pages/index/index';
import Login from './pages/login/login_page';
import Join from './pages/join/join_page';
import OrderPage from './pages/order/order_page';
import Mypage from './pages/mypage/my_page';
import Profile from './pages/profile/profile_page';
import Wishlist from "./pages/wishlist/wishlist_page";
import Coupon from './pages/coupon/coupon_page';

function App() {
  return (
    <div className="App">
        <Route path='/' component={Index} exact/>
        <Route path='/login' component={Login}/>
        <Route path='/join' component={Join}/>
        <Route path='/order_page' component={OrderPage} />
        <Route path='/mypage' component={Mypage}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/wishlist' component={Wishlist}/>
        <Route path='/coupon' component={Coupon}/>
    </div>
  );
}

export default App;
