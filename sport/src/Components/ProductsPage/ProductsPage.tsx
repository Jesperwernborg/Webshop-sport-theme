/* import React, { useEffect, useState } from "react";
import './ProductsPage.scss';

import Axios from 'axios';
import IProduct from "./IProduct";




export default function ProductPage() {


    const [productList, setProductList] = useState([]);

        
    useEffect(() => {
        async function getProducts() {
            let result = await Axios.get('https://localhost:5001/products/')
            setProductList(result.data)
        }
        getProducts();
    }, [])
        



    let productCard = productList.map((product: IProduct) => {
        return (
            <React.Fragment key={product.id}>
                <div className="productCartContainer">
                    <form key={product.id} action={`/products/${product.id}`}>
                        <button type="submit" className="productsButton" >
                            <div className="productCartLayout" >
                                <img src={product.image} alt=""/>
                                <div className="productCartheader bg-orange">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>{product.price}:-</p>
                                </div>
                            </div>
                        </button>
                    </form>
                </div>
            </React.Fragment>)
        })

    return (
        <React.Fragment>
        <div className="navBlocker"></div>
        <div className="productsPage">
            <div className="productsTitleContainer"><h2>PRODUCTS</h2></div>
            <div className="productContainer">{productCard}</div>
        </div>
           
       </React.Fragment>
       );
    
}
 */




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




    


    async fetchProducts(url: string){
       
        const resultTuple: [IProduct[], string] = await this.props.service.getProducts(url);
        const fetchedProducts: IProduct[] = resultTuple[0];
   
        if(fetchedProducts.length){
            
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
                            <React.Fragment>
                                <Link to={`/products/${item.id}`} className="product-link" key={item.id}>
                                <Card description={item.description} image={item.imageUrl} name={item.name} price={item.price}/>
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