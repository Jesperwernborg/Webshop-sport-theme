import React from "react";
import './ProductsPage.scss';
import { Link } from "react-router-dom";

import IProduct from "./IProduct";
import { IProductService } from "../../services/ProductServices";
import Card from "../card/Card";



interface IProductProps {
    service: IProductService;

}


interface IProductState {
    products: IProduct[];


}



export default class Products extends React.Component<IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props);

        this.state = {
            products: []
        };
    }



    componentDidMount() {
        this.fetchProducts('https://localhost:5001/products');
    }







    async fetchProducts(url: string) {

        const resultTuple: [IProduct[], string] = await this.props.service.getProducts(url);
        const fetchedProducts: IProduct[] = resultTuple[0];

        if (fetchedProducts.length) {

            this.setState({
                products: fetchedProducts,

            });
        }


    }


    render() {

        return (
            <div>
                <div className="navBlocker"></div>
                <div className="productsPage">
                    <div className="product-wrapper">
                        <div className="productsTitleContainer"><h2>PRODUCTS</h2></div>
                        <div className="productContainer">
                            {this.state.products.map(item => {

                                return (
                                    <React.Fragment key={item.id}>
                                        <Link to={`/products/${item.id}`} className="product-link" key={item.id}>
                                            <Card description={item.description} imageUrl={item.imageUrl} name={item.name} price={item.price} />
                                        </Link>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}