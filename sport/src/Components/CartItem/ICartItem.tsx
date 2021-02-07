import IProduct from "../ProductsPage/IProduct";

export interface ICartItem {
    product: IProduct;
    quantity: number;
    totalPrice: number;
}