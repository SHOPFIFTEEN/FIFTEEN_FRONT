import React, {Component} from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Banner_1 from '../../img/banner.svg';
import Banner_2 from '../../img/banner_2.svg';
import Bestseller from "../../components/bestSeller/Bestseller";
import RecentBooks from "../../components/recentBooks/RecentBooks";
import './index.css';
import {Link, withRouter} from "react-router-dom";
import _ from "lodash";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import {Container} from "reactstrap";
import {getNowDate, nowDate} from "../../Utils/commonUtils";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [{'productSeq' : '1'}],
            fieldProducts : [{'productSeq' : '1'}],
            field : '',
            keyword : 'field',
            slideEventImage : [{}],
            slideNoticeImage : [{}],
        }
    }

    getEvent= async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:3001/event/banner/active',
            data: { },
            headers : {
                "Content-Type" : 'application/json'
            },
        })
        const nowDate = getNowDate();

        const newSlide = result.data.map((slide)=>{
            if(slide.start_date < nowDate && slide.end_date > nowDate){
                return slide;
            }else {
                return null;
            }
        }).filter(el => {
            return el != null;
        });
        console.log(result.data);
        console.log(newSlide);
        this.setState({slideEventImage: newSlide});
    }

    getNotice= async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:3001/notice/banner/active',
            data: { },
            headers : {
                "Content-Type" : 'application/json'
            },
        });

        const nowDate = getNowDate();

        const newSlide = result.data.map((slide)=>{
            if(slide.start_date < nowDate && slide.end_date > nowDate){
                return slide;
            }else {
                return null;
            }
        }).filter(el => {
            return el != null;
        });
        this.setState({slideNoticeImage: newSlide});
    }

    fieldProducts(f) {
        if(f=='??????'){
            this.setState({fieldProducts : this.state.products});
        }else{
            var filterProduct = _.filter(this.state.products, {'field' : f});
            this.setState({fieldProducts : filterProduct});
        }

        //????????? ?????? ?????? ?????? ??????
    }

    componentDidMount() {
        this.getEvent();
        this.getNotice();
    }

    render() {
        const settingsE = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed : 1500,
            arrows : true,
            dots : true,
        };

        const settingsN = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed : 2000,
        };

        return (
            <div className="indexBox">
                <Header/>
                <div className="field">
                    <div className="index-fieldBox">
                        <Link to={`/list/${'??????'}`}>
                            <div onClick={()=>this.fieldProducts('??????')} >??????</div>
                        </Link>
                        <Link to={`/list/${'??????'}`}>
                            <div onClick={()=>this.fieldProducts('??????')}>??????</div>
                        </Link>
                        <Link to={`/list/${`???/?????????`}`}>
                           <div onClick={()=>this.fieldProducts('???/?????????')}>???/?????????</div>
                        </Link>
                        <Link to={`/list/${'??????/??????'}`}>
                            <div onClick={()=>this.fieldProducts('??????/??????')}>??????/??????</div>
                        </Link>
                        <Link to={`/list/${'??????/??????'}`}>
                            <div onClick={()=>this.fieldProducts('??????/??????')}>??????/??????</div>
                        </Link>
                        <Link to={`/list/${'?????????/IT'}`}>
                            <div onClick={()=>this.fieldProducts('?????????/IT')}>?????????/IT</div>
                        </Link>
                        <Link to={`/list/${'?????????'}`}>
                            <div onClick={()=>this.fieldProducts('?????????')}>?????????</div>
                        </Link>
                        <Link to={`/list/${'??????'}`}>
                            <div onClick={()=>this.fieldProducts('??????')}>??????</div>
                        </Link>
                        <Link to={`/list/${'??????'}`}>
                            <div onClick={()=>this.fieldProducts('??????')}>??????</div>
                        </Link>
                    </div>
                </div>
                <div className='slider-box'>
                    <Slider {...settingsE}>
                        {this.state.slideEventImage.map(arr=>(
                            arr === null ? <></> :
                            <Link to={`/event_detail/${arr.eventSeq}`}>
                                <div key={arr.eventSeq}>
                                    <img src={arr.image} width='100%' height='400px'/>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
                <Bestseller/>
                <RecentBooks/>
                <div className='slider-box-n'>
                    <Slider {...settingsN}>
                        {this.state.slideNoticeImage.map(arr=>(
                            arr === null ? null :
                            <Link to={`/notice_detail/${arr.noticeSeq}`}>
                                <div key={arr.noticetSeq}>
                                    <img src={arr.image} width='1000px' height='200px'/>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(Index);