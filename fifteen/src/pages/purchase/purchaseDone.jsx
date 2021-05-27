import React, {Component} from 'react';
import axios from "axios";

class PurchaseDone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount : {},
            //amount 안에 total, tax_free, vat, point, discount 중
            item_name : ''
        }
    }

    kakaoPay = async () =>{
        let result = await axios({
            method : 'POST',
            url : `https://kapi.kakao.com/v1/payment/approve`,
            headers : {
                'Host' : 'kapi.kakao.com',
                'Authorization': `KakaoAK {e53cf83a206af79d2c72f279b3c12654}`,
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            params : {
                cid : 'TC0ONETIME',
                tid : '이건 서버에서 response값을 받아서 넘겨줘야됨',
                partner_order_id : 0,
                partner_user_id : 0,
                pg_token : this.state.props.match.params.pg_token
            }
        }).then((response)=> {
            if(response.status>=400){
                alert(result.data.extras.method_result_message);
                //되돌아가기
            }else{
                this.setState({
                    amount : result.data.amount,
                    item_name : result.data.item_name
                })
            }
        })
    }

    render() {
        return (
            <div>
                결제완료됨
                결제 금액 : {this.state.amount.total}
                결제 상품 : {this.state.item_name}
            </div>
        );
    }
}

export default PurchaseDone;