import IProduct from "../ProductsPage/IProduct";

export interface IOrder_Detail {
  id: number;
  quantity: number;
  productId: number;
  product: IProduct | null;
  orderId: number;
}
