import { IOrder_Detail } from "./IOrder_Detail";

export interface IOrder {
    id: number;
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    status: number;
    totalPrice: number;
    order_Details: IOrder_Detail[];
}

