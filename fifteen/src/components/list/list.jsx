import React, {Component} from 'react';
import './list.css';
import axios from 'axios';
import _ from 'lodash';
import {withRouter, Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [{'productSeq': '1'}],
            fieldProducts: [{'productSeq': '1'}],
            currentProducts: [],
            field: '',
            keyword: 'field',
            range: [0, 50000],
            currentPage: 1,
            postsPerPage: 10,
            pageNumbers: [],
            pN : [],
            isSlide : false
        }
    }

    currentPosts(tmp) {
        var indexOfLast = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirst = indexOfLast - this.state.postsPerPage;
        let currentPosts = 0;
        currentPosts = _.slice(tmp,indexOfFirst, indexOfLast);
        console.log(currentPosts);
        return currentPosts;
    }

    getBookList = async function () {
        let result = await axios({
            method: 'GET',
            url: 'http://52.79.196.94:3001/product',
            data: {},
            headers: {
                "Content-Type": 'application/json'
            },
        });
        this.setState({products: result.data});
        if (this.props.match.params.field === '전체') {
            this.setState({fieldProducts: this.state.products});
        } else {
            console.log(this.props.match.params.field);
            let result1 = await axios({
                method: 'GET',
                url: `http://52.79.196.94:3001/product/category/${this.props.match.params.field}`,
                data: {},
                headers: {
                    "Content-Type": 'application/json'
                },
            })
            this.setState({fieldProducts: result1.data, currentProducts: result1.data});
        }
        var pageNumbers= [];
        for(let i =1; i<=Math.ceil(this.state.fieldProducts.length/this.state.postsPerPage); i++){
            pageNumbers.push({'num' : i});
        }
        this.setState ({pN : pageNumbers});
    }

    fieldProducts(f) {
        if (f === '전체') {
            this.setState({fieldProducts: this.state.products});
            var pageNumbers= [];
            for(let i =1; i<=Math.ceil(this.state.products.length/this.state.postsPerPage); i++){
                pageNumbers.push({'num' : i});
            }
            this.setState ({pN : pageNumbers});
        } else {
            var filterProduct = _.filter(this.state.products, {'field': f});
            this.setState({fieldProducts: filterProduct, currentProducts: filterProduct});
            this.setState({currentPage : 1});
            var pageNumbers1= [];
            for(let i =1; i<=Math.ceil(filterProduct.length/this.state.postsPerPage); i++){
                pageNumbers1.push({'num' : i});
            }
            this.setState ({pN : pageNumbers1});
        }

        this.setState({
            field : f,
            range: [0, 50000]
        })
    }

    sortBySale() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['sale']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({currentProducts: reverseSort});
    }

    sortByHighPrice() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['price']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({currentProducts: reverseSort});
    }

    sortByRowPrice() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['price']);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({currentProducts: saleSort});
    }

    sortByRecent() {
        var arr = this.state.fieldProducts;
        var saleSort = _.sortBy(arr, ['productSeq']);
        var reverseSort = _.reverse(saleSort);
        // var sliceSort =  _.slice(reverseSort,0,5);
        this.setState({currentProducts: reverseSort});
    }

    sortByName() {
        var arr = this.state.fieldProducts;
        arr.sort(function (a, b) {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
        this.setState({currentProducts: arr});
    }

    sortByFilter() {
        var rang = this.state.range;
        var arr = this.state.fieldProducts;
        var filterSort = _.filter(arr, function(o){
            return ((rang[0] <= o.price) && (o.price<= rang[1]));
        });
        this.setState({currentProducts : filterSort});
    }

    pagination=(e)=> {
       this.setState({currentPage : e});
    }
    
    componentDidMount() {
        this.getBookList();
        this.currentPosts();
        this.setState({field:this.props.match.params.field})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.state.isSlide && prevState.isSlide){
            this.sortByFilter();
            this.currentPosts();
        }
    }

    render() {
        const classes = makeStyles((theme)=>({
            root: {
                width: 500,
            },
        }));
        const handleChange = (event, newValue) => {
            this.setState({
                range: newValue,
                isSlide : true
            })
        };

        const handleChangeAfter = (event,newValue) => {
            this.setState({
                isSlide : false
            })
        }
        return (
            <div>
                <div className="list">
                    <div className="list-fieldBox">
                        <div onClick={() => this.fieldProducts('전체')}>전체</div>
                        <div onClick={() => this.fieldProducts('소설')}>소설</div>
                        <div onClick={() => this.fieldProducts('시/에세이')}>시/에세이</div>
                        <div onClick={() => this.fieldProducts('경제/경영')}>경제/경영</div>
                        <div onClick={() => this.fieldProducts('역사/문화')}>역사/문화</div>
                        <div onClick={() => this.fieldProducts('컴퓨터/IT')}>컴퓨터/IT</div>
                        <div onClick={() => this.fieldProducts('외국어')}>외국어</div>
                        <div onClick={() => this.fieldProducts('여행')}>여행</div>
                        <div onClick={() => this.fieldProducts('만화')}>만화</div>
                    </div>
                    <div className="list-sortBox">
                        <button className="list-sortBox-sort">{this.state.field}</button>
                        <div className="list-sortBox-bar"/>
                        <button className="list-sortBox-sale" onClick={() => this.sortByRecent()}>최신등록순</button>
                        <button className="list-sortBox-lowPrice" onClick={() => this.sortByRowPrice()}>낮은 가격순
                        </button>
                        <button className="list-sortBox-highPrice" onClick={() => this.sortByHighPrice()}>높은 가격순
                        </button>
                        <button className="list-sortBox-highPrice" onClick={() => this.sortByName()}>이름순</button>
                        <div className={classes.root}>
                            <Typography id="range-slider"
                                        style={{width: '130px', marginLeft: '10px', marginBottom: '10px'}} gutterBottom>
                                &nbsp;
                                <Slider
                                    value={this.state.range}
                                    onChange={handleChange}
                                    onChangeCommitted={handleChangeAfter}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    max={50000}
                                    min={0}
                                    step={1000}
                                    marks
                                />
                            </Typography>
                        </div>
                    </div>
                    <div className="list-product">
                        {this.currentPosts(this.state.currentProducts).map(arr => (
                            <div key={arr.productSeq}>
                                <Link to={`/product/${arr.productSeq}/${this.state.keyword}`}>
                                    <div className="list-product-item">
                                        <div className="list-product-item-imageBox">
                                            <img className="list-product-item-imageBox-img" src={arr.image}/>
                                        </div>
                                        <div className="list-product-item-title">{arr.title}</div>
                                        <div className="list-product-item-sub">지은이 : {arr.author} | 출판사
                                            : {arr.publisher}</div>
                                        <div className="list-product-item-price">{arr.price}원</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='page-num-box'>
                        {this.state.pN.map(arr => (
                            <button className='page-num' key={arr.num}
                                    onClick={() => this.pagination(arr.num)}>{arr.num}</button>
                        ))}
                    </div>
                </div>
            </div>
        );
        }

}

export default withRouter(List);
