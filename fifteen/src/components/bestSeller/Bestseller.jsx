import React, {Component} from 'react';
import './bestseller.css';
import axios from 'axios';


class Bestseller extends Component {
    constructor(props) {
        super(props);
        this.state = {
           products : [{'productSeq' : '1'}]
        }
    }

    getBookList = async function() {
        let result =await axios ({
            method : 'GET',
            url : 'http://3.34.126.33:8080/product/select_all',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type' : 'application/json'
            },
        })
        this.setState({products : result.data});
        console.log(result.data);
        console.log(this.state.products);
    }

    componentDidMount() {
        this.getBookList();
    }

    render() {
        return (
            <div>
                <div className="bestSellerBox">
                    <div className="bestSellerTitle">Best Seller</div>
                    <div className="bestSellerBooks">
                        {this.state.products.map(arr => (
                            <div key={arr.productSeq}>
                                <div className="bestSellerBookItem">
                                    <div className="bestSellerBookItemImg">
                                        {arr.image}
                                    </div>
                                    <div className="bestSellerBookItemTitle">{arr.title}</div>
                                    <div className="bestSellerBookItemSub">지은이 : {arr.author} | 출판사 : {arr.publisher}</div>
                                    <div className="bestSellerBookItemPrice">{arr.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Bestseller;