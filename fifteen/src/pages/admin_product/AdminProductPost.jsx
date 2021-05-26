import React, {Component} from 'react';
import '../admin/admin_product.css';
import  './adminProductEdit.css';
import {Link, withRouter} from "react-router-dom";
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';
import axios from "axios";
import _ from "lodash";
import AdminNavProduct from "../../components/page_nav/AdminNavProduct";
import Review from "../../components/review/review";
import QnA from "../../components/Q&A/Q&A";
import {getCookie} from "../../cookies";
import AdminNav from "../../components/page_nav/admin_nav";
import moment from "moment";
import styles from "../../components/header/header.module.css";


class AdminProductPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            field : '',
            publisher : '',
            author : '',
            price : '',
            a_intro : '',
            delivery : '',
            mileage : '',
            page : '',
            p_date : '',
            discount : '',
            image : '',
            content : '',
            prevURL : '',
            selectedFile: null,
            imageURL : null,
            isUpload : false
        }
        this.handleChangeField = this.handleChangeField.bind(this);

    }

    getProductInfo = async function() {
        if(this.props.match.params.productSeq==='0'){
            this.state.productInfo = {
                title : null,
                field : null,
                publisher : null,
                author : null,
                price : null,
                a_intro : null,
                delivery : null,
                mileage : null,
                page : null,
                p_date : null,
                discount : null,
                content : null,
                image : null,
            }}else{
            let result =await axios ({
                method : 'GET',
                url : `http://52.79.196.94:3001/product/${this.props.match.params.productSeq}`,
                data: { },
                headers : {
                    "Content-Type" : 'application/json'
                },
            })
            this.setState({
                title : result.data[0].title,
                field : result.data[0].field,
                publisher : result.data[0].publisher,
                author : result.data[0].author,
                price : result.data[0].price,
                a_intro : result.data[0].a_intro,
                delivery : result.data[0].delivery,
                mileage : result.data[0].mileage,
                page : result.data[0].page,
                p_date : result.data[0].p_date,
                discount : result.data[0].discount,
                content : result.data[0].content,
                image : result.data[0].image,
            });
        }
    }

    reProductInfo =async () =>{
        let {isUpload} = this.state;
        if(isUpload===false){
            alert("이미지를 업로드 해주세요");
        }else{
            const {history} = this.props;
            let result = await axios ({
                method : 'POST',
                url : `http://52.79.196.94:3001/product/re/${this.props.match.params.productSeq}`,
                data : {
                    title : this.state.title,
                    field : this.state.field,
                    publisher : this.state.publisher,
                    author : this.state.author,
                    price : this.state.price,
                    a_intro : this.state.a_intro,
                    delivery : this.state.delivery,
                    mileage : this.state.mileage,
                    page : this.state.page,
                    p_date : this.state.p_date,
                    discount : this.state.discount,
                    content : this.state.content,
                    image : this.state.imageURL,
                },
                headers : {
                    "Content-Type" : 'application/json',
                    'x-access-token' : getCookie("accessToken")
                },
            })
            history.push('/admin/product')
        }

    }
    handlePost=()=>{
        const image = new FormData();
        image.append('file', this.state.selectedFile);
        return axios.post("http://52.79.196.94:3001/image/upload", image).then(res => {
            alert('성공');
            this.setState({imageURL : res.data.image});
            this.setState({isUpload : true});
            console.log(this.state.imageURL);
        }).catch(err => {
            alert('실패');
        })
    }

    rehandlePost=()=>{
        const image = new FormData();
        image.append('file', this.state.selectedFile);
        return axios.post(`http://52.79.196.94:3001/image/upload`, image).then(res => {
            alert('성공');
            this.setState({imageURL : res.data.image});
            this.setState({isUpload : true});
            console.log(this.state.imageURL);
        }).catch(err => {
            alert('실패')
        })
    }

    addProductInfo = async () =>{
        let {isUpload,title,content,field,publisher,author,price,a_intro,delivery,mileage,page,p_date,discount} = this.state;
        if(isUpload===false){
            alert("이미지를 업로드 해주세요");
        }else if(!field){
            alert("카테고리를 입력해 주세요")
        }else if(!title || !content || !publisher|| !author|| !price|| !a_intro|| !delivery|| !mileage|| !page|| !p_date|| !discount){
            alert("필수정보를 입력해 주세요")
        }else {
            const {history} = this.props;
            let result = await axios({
                method: 'POST',
                url: `http://52.79.196.94:3001/product/add`,
                data: {
                    title: this.state.title,
                    field: this.state.field,
                    publisher: this.state.publisher,
                    author: this.state.author,
                    price: this.state.price,
                    a_intro: this.state.a_intro,
                    delivery: this.state.delivery,
                    mileage: this.state.mileage,
                    page: this.state.page,
                    p_date: this.state.p_date,
                    discount: this.state.discount,
                    content: this.state.content,
                    image: this.state.imageURL,
                },
                headers: {
                    "Content-Type": 'application/json',
                    'x-access-token': getCookie("accessToken")
                },
            })
            history.push('admin/product')
        }
    }

    handleChangeTitle = (e) => {
        this.setState({
            title : e.target.value,
        })
    }

    handleChangeField = (e) => {
        this.setState({
            field : e.target.value,
        })
    }

    handleChangePublisher = (e) => {
        this.setState({
            publisher : e.target.value,
        })
    }

    handleChangeAuthor = (e) => {
        this.setState({
            author : e.target.value,
        })
    }

    handleChangePrice= (e) => {
        this.setState({
            price : e.target.value,
        })
    }


    handleChangeAintro = (e) => {
        this.setState({
            a_intro : e.target.value,
        })
    }

    handleChangeDelivery = (e) => {
        this.setState({
            delivery : e.target.value,
        })
    }

    handleChangeMileage = (e) => {
        this.setState({
            mileage : e.target.value,
        })
    }

    handleChangePage = (e) => {
        this.setState({
            page : e.target.value,
        })
    }

    handleChangePdate = (e) => {
        this.setState({
            p_date : moment(e.target.value).format('YYYY-MM-DD'),
        })
    }

    handleChangeDiscount = (e) => {
        this.setState({
            discount : e.target.value,
        })
    }

    handleChangeContent = (e) => {
        this.setState({
            content : e.target.value,
        })
    }
    handleFileInput(e){
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                prevURL : reader.result,
                selectedFile : e.target.files[0]
            })
        }
        reader.readAsDataURL(file);
    }

    handleChangeImage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                prevURL : reader.result,
                image : file
            })
        }
        reader.readAsDataURL(file);
    }

    componentDidMount() {
        this.getProductInfo();
    }

    render(){
        let profile_preview = null;
        if(this.state.file !== ''){
            profile_preview = <img src={this.state.prevURL} width='500px' height='500px'/>
        }

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
                        <div className='admin-nav'>
                            <AdminNavProduct />
                            <div className='admin-nav-padding'/>
                            <AdminNav />
                        </div>
                        <div className='admin-productEdit-info'>
                            <div className="admin-productEdit-info-titleBox">
                                {!(this.props.match.params.productSeq==='0') ?
                                    <div className="admin-productEdit-info-title-text">Information 수정</div>
                                    :
                                    <div className="admin-productEdit-info-title-text">Information 등록</div>
                                }
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>카테고리</div>
                                <div className='admin-productEdit-info-category'>{this.state.field}</div>
                                <label>
                                <select onChange={this.handleChangeField} className='admin-productEdit-info-category' value={this.state.field}>
                                    <option disabled >카테고리를 선택해 주세요</option>
                                    <option value="소설">소설</option>
                                    <option value="시/에세이">시/에세이</option>
                                    <option value="경제/경영">경제/경영</option>
                                    <option value="역사/문화">역사/문화</option>
                                    <option value="컴퓨터/IT">컴퓨터/IT</option>
                                    <option value="외국어">외국어</option>
                                    <option value="여행">여행</option>
                                    <option value="만화">만화</option>
                                </select></label>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>제목</div>
                                <input type='text' onChange={this.handleChangeTitle} className='admin-productEdit-info-title' value={this.state.title}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>출판사</div>
                                <input type='text' onChange={this.handleChangePublisher} className='admin-productEdit-info-publisher' value={this.state.publisher}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>지은이</div>
                                <input type='text' onChange={this.handleChangeAuthor} className='admin-productEdit-info-author' value={this.state.author}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>가격</div>
                                <input type='text' onChange={this.handleChangePrice} className='admin-productEdit-info-price' value={this.state.price}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>저자 소개</div>
                                <input type='text' onChange={this.handleChangeAintro} className='admin-productEdit-info-authorIntro' value={this.state.a_intro}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>작품 소개</div>
                                <input type='text' onChange={this.handleChangeContent} className='admin-productEdit-info-intro' value={this.state.content}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>배송비</div>
                                <input type='text' onChange={this.handleChangeDelivery} className='admin-productEdit-info-intro' value={this.state.delivery}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>마일리지</div>
                                <input type='text' onChange={this.handleChangeMileage} className='admin-productEdit-info-intro' value={this.state.mileage}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>페이지 수</div>
                                <input type='text' onChange={this.handleChangePage} className='admin-productEdit-info-intro' value={this.state.page}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>출간일</div>
                                <input type='text' onChange={this.handleChangePdate} className='admin-productEdit-info-intro' value={this.state.p_date}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>할인율</div>
                                <input type='text' onChange={this.handleChangeDiscount} className='admin-productEdit-info-intro' value={this.state.discount}/>
                            </div>
                            <div className='admin-productEdit-info-box'>
                                <div className='admin-productEdit-info-subject'>이미지</div>
                                <input type='file' name="file" onChange={e => this.handleFileInput(e)}/>
                                {!(this.props.match.params.productSeq==='0') ?
                                    <button type="button" onClick={this.rehandlePost} className='admin-info-box-btn-submit'>이미지 수정</button>
                                    :
                                    <button type="button" onClick={this.handlePost} className='admin-info-box-btn-submit'>이미지 등록</button>
                                }
                                {profile_preview}
                            </div>
                            <div className='admin-info-box-button'>
                                <Link to={`/admin/product`}>
                                    <button className='admin-info-box-btn-cancel'>취소</button>
                                </Link>
                                <div>
                                    {!(this.props.match.params.productSeq==='0') ?
                                            <button onClick={this.reProductInfo} className='admin-info-box-btn-submit'>수정</button>
                                        :
                                            <button onClick={this.addProductInfo} className='admin-info-box-btn-submit'>등록</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminProductPost);
