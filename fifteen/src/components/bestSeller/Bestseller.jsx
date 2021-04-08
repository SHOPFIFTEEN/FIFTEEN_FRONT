import React, {Component} from 'react';
import './bestseller.css';


class Bestseller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [
                {
                    productSeq : 1,
                    title : '나는 더미야_1',
                    image : '나중추가',
                    author : 'dummy dum',
                    price : '13,000',
                    publisher : '애웅출판사'
                },
                {
                    productSeq : 2,
                    title : '나는 더미야_2',
                    image : '나중추가',
                    author : 'dummy dum',
                    price : '13,000',
                    publisher : '애웅출판사'
                },
                {
                    productSeq : 3,
                    title : '나는 더미야_3',
                    image : '나중추가',
                    author : 'dummy dum',
                    price : '13,000',
                    publisher : '애웅출판사'
                },
                {
                    productSeq : 4,
                    title : '나는 더미야_4',
                    image : '나중추가',
                    author : 'dummy dum',
                    price : '13,000',
                    publisher : '애웅출판사'
                },
                {
                    productSeq : 5,
                    title : '나는 더미야_5',
                    image : '나중추가',
                    author : 'dummy dum',
                    price : '13,000',
                    publisher : '애웅출판사' 
                }
            ]
        }
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