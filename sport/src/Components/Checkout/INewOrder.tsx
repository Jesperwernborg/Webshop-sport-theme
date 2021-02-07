import { INewOrder_Detail } from "./INewOrder_Detail";


export interface INewOrder {
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    order_Details: INewOrder_Detail[];
}