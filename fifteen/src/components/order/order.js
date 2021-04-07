import React, {Component} from 'react'
import './order.css';

class Order extends Component{
    render(){
        return(
            <div>
                <div className='order'>
                    <div className='order_info_title'>주문 상품 정보</div>
                    <div className="order_info_box">

                    </div>
                    <div className="order_paging">
                        <button className="order_paging_before"> </button>
                        <button className="order_paging_this">1</button>
                        <button className="order_paging_after"> </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Order;