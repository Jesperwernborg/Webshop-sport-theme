import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IProductService, ProductService } from "../../services/ProductServices";
import IProduct from "../ProductsPage/IProduct";
import "./ProductDetails.scss";

interface IProductDetailsProps {
  onAddToCart(product: IProduct): void;
}

export default function ProductDetails(props: IProductDetailsProps) {

  const defaultProduct = {
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    price: 0
  }

  const [product, setProduct] = useState(defaultProduct);
  let { id }: any = useParams();





  useEffect(() => {
    const service: IProductService = new ProductService();
    async function fetchProduct(url: string) {
      const resultTuple = await service.getProduct(url);
      const fetchedProduct: IProduct | null = resultTuple[0];
      if (fetchedProduct) {
        setProduct(fetchedProduct);

      }

    }

    fetchProduct(`https://localhost:5001/products/${id}`);

  }, [id]);

  function handleAdd(e: React.MouseEvent<HTMLElement>) {
    props.onAddToCart(product);
  }




  return (
    <React.Fragment>
      <div className="navBlocker"></div>
      <div className="productDetailsPage">
        <div className="productInformation">
          <h2 className="detail-name">{product.name}</h2>
          <img alt="img" src={product.imageUrl} />
          <p className="detail-description">{product.description}</p>
          <p>Price: <b>{product.price}</b> SEK</p>
        </div>
        <button onClick={handleAdd} className="standardButton bg-orange addToCartBtn button">ADD TO CART</button>
        <Link to="/products" className="link backBtnCheckout"><span>Back to Products</span></Link>
      </div>
    </React.Fragment>)

}
