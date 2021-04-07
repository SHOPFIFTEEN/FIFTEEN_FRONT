import React, {Component} from 'react'
import './profile_page.css'
import Profile from '../../components/profile/profile'
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import MyPage_side from '../../../src/components/MyPage_side/MyPage_side';

class ProfilePage extends Component{
    render(){
        return(
            <div>
                <div className="profilePage">
                    <Header />
                    <div className="profilePage_line" />
                    <div className="profilePage_title">Profile</div>
                    <div className="profilePage_main">
                        <MyPage_side />
                        <Profile />
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
export default ProfilePage;