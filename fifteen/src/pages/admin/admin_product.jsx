import React, {Component} from 'react';
import './admin_product.css';
import {withRouter, Link} from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import AdminNav from "../../components/page_nav/admin_nav";
import styles from "../../components/header/header.module.css";
import Search from "../../img/search.svg";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class AdminProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [{'productSeq' : '1'}],
            fieldProducts : [{'productSeq' : '1'}],
            sortProducts : [{}],
            field : '',
            keyword : '',
            range : [0,30000],
            currentPage: 1,
            postsPerPage: 12,
            pageNumbers: [],
            pN : []
        }
    }

    getBookList = async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://52.79.196.94:3001/product',
            data: { },
            headers : {
                'Access-Control-Allow-Origin' : '*',
                "Content-Type" : 'application/json'
            },
        })
        this.setState({products : result.data, fieldProducts: result.data});
        var pageNumbers= [];
        for(let i =1; i<=Math.ceil(this.state.fieldProducts.length/this.state.postsPerPage); i++){
            pageNumbers.push({'num' : i});
        }
        this.setState ({pN : pageNumbers});
    }
    currentPosts(tmp) {
        var indexOfLast = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirst = indexOfLast - this.state.postsPerPage;
        let currentPosts = 0;
        currentPosts = _.slice(tmp,indexOfFirst, indexOfLast);
        console.log(currentPosts);
        return currentPosts;
    }

    search = async ()=> {
        let result =await axios ({
            method : 'GET',
            url : `http://52.79.196.94:3001/search/${this.state.keyword}`,
            data: { },
            headers : {
                "Content-Type" : 'application/json'
            },
        })
        this.setState({fieldProducts : result.data});
        console.log(this.state.fieldProducts);
    }

    handleChangeKeyword = (e) => {
        this.setState({keyword: e.target.value});
    }

    fieldProducts(f) {
        if(f=='전체'){
            this.setState({fieldProducts : this.state.products});
        }else{
            var filterProduct = _.filter(this.state.products, {'field' : f});
            this.setState({fieldProducts : filterProduct});
        }

        //클릭시 강조 표시 추가 필요
    }

    sortBySale() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['sale']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({fieldProducts: reverseSort});
    }

    sortByHighPrice() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['price']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({fieldProducts: reverseSort});
    }

    sortByRowPrice() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['price']);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({fieldProducts: saleSort});
    }

    sortByRecent(){
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['productSeq']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({fieldProducts: reverseSort});
    }

    sortByName(){
        var arr = this.state.fieldProducts;
        arr.sort(function(a,b){
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
        this.setState({fieldProducts : arr});
    }

    sortByFilter() {
        var rang = this.state.range;
        var arr = this.state.fieldProducts;
        var filterSort = _.filter(arr, function(o){
            return ((rang[0] <= o.price) && (o.price<= rang[1]));
        });
        this.setState({fieldProducts : filterSort});
    }

    alert=()=> {
        alert('검색어를 입력해주세요');
    }
    pagination=(e)=> {
        this.setState({currentPage : e});
    }


    componentDidMount() {
        this.getBookList();
        this.currentPosts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.range!==this.state.range){
            this.sortByFilter();
            this.currentPosts();
        }
    }

    render(){
        const classes = makeStyles((theme)=>({
            root: {
                width: 500,
            },
        }));
        const handleChange = (event, newValue) => {
            this.setState({
                range: newValue
            })
        };
        return(
            <div>
                <div className={styles.header}>
                <div className={styles.header__box}>
                <div className={styles.header__box__left}>
                        <div className={styles.header__box__left__title}>#FIFTEEN</div>
                    <div className={styles.header__box__left__category}>
                        Shopping mall specializing in domestic books
                    </div></div></div></div>
                <div className="admin">
                    <div className="admin-bar" />
                    <div className="admin-title">관리자 페이지</div>
                    <div className="admin-box">
                        <AdminNav />
                        <div className="admin-manage">
                            <div className="admin-manage-head">
                            <div className="admin-manage-title">상품 관리</div>
                            <div className='admin-searchBox-product'>
                                <input type="text" name='search' onChange={this.handleChangeKeyword} className='admin-searchBox-box'/>
                                {!(this.state.keyword)?  <img onClick={this.alert} src={Search} className='admin-searchBox-img'/>:
                                        <img src={Search} onClick={()=>this.search()} className='admin-searchBox-img'/>}
                            </div>
                            </div>
                            <div className="product-fieldBox">
                                <div onClick={()=>this.fieldProducts('전체')} >전체</div>
                                <div onClick={()=>this.fieldProducts('소설')}>소설</div>
                                <div onClick={()=>this.fieldProducts('시/에세이')}>시/에세이</div>
                                <div onClick={()=>this.fieldProducts('경제/경영')}>경제/경영</div>
                                <div onClick={()=>this.fieldProducts('역사/문화')}>역사/문화</div>
                                <div onClick={()=>this.fieldProducts('컴퓨터/IT')}>컴퓨터/IT</div>
                                <div onClick={()=>this.fieldProducts('외국어')}>외국어</div>
                                <div onClick={()=>this.fieldProducts('여행')}>여행</div>
                                <div onClick={()=>this.fieldProducts('만화')}>만화</div>
                            </div>
                            <div className="list-sortBox">
                                <button className="list-sortBox-sort">sort</button>
                                <div className="list-sortBox-bar"/>
                                <button className="list-sortBox-sale" onClick={() => this.sortByRecent()}>최신등록순</button>
                                <button className="list-sortBox-lowPrice" onClick={()=> this.sortByRowPrice()}>낮은 가격순</button>
                                <button className="list-sortBox-highPrice" onClick={()=> this.sortByHighPrice()}>높은 가격순</button>
                                <button className="list-sortBox-highPrice" onClick={()=> this.sortByName()}>이름순</button>
                                <div className={classes.root}>
                                    <Typography id="range-slider" style={{width: '130px', marginLeft : '10px', marginBottom : '10px'}} gutterBottom>
                                        &nbsp;
                                        <Slider
                                            value={this.state.range}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            max={30000}
                                            min={0}
                                            step={1000}
                                            marks
                                        />
                                    </Typography>
                                </div>
                            </div>
                            <div className="admin-manage-box">
                                <div className="admin-manage-box-item">
                                    {this.currentPosts(this.state.fieldProducts).map(arr => (
                                        <div key={arr.productSeq}>
                                            <Link to={`/admin/product_edit/${arr.productSeq}`}>
                                                <div className="bestSellerBookItem">
                                                    <div className="admin-product-item-imageBox">
                                                        <img className="admin-product-item-imageBox-img" src={arr.image} />
                                                    </div>
                                                    <div className="bestSellerBookItemTitle">{arr.title}</div>
                                                    <div className="bestSellerBookItemSub">지은이 : {arr.author} | 출판사 : {arr.publisher}</div>
                                                    <div className="bestSellerBookItemPrice">{arr.price}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='page-num-box-admin-product'>
                                {this.state.pN.map(arr=> (
                                    <button className='page-num' key={arr.num} onClick={()=>this.pagination(arr.num)}>{arr.num}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminProduct);
