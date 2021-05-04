import React, {Component} from 'react'
import './product_page.css'
import Product from '../../../src/components/product/product';
import Header from '../../../src/components/header/Header';
import Footer from '../../../src/components/footer/Footer';


class ProductPage extends Component{
    render(){
        return(
            <div>
                <div className="ProductPage">
                    <Header />
                    <div className="ProductPage-main">
                        <Product />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
export default ProductPage;