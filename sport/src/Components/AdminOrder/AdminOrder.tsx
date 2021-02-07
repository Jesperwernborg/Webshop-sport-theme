import React from "react";
import { IOrder } from "../Checkout/IOrder";
import "./AdminOrder.scss";

interface IAdminOrderProps {
    order: IOrder;
}

export default function Order(props: IAdminOrderProps) {
    return (
        <div className="adminOrderItem bg-orange">
            <div className="adminOrderItemText">
                <div className="adminOrderItemCol">
                    <p>Order ID</p>
                    <p>{props.order.id}</p>
                </div>
                <div className="adminOrderItemCol">
                    <p>Date</p>
                    <p>{props.order.created}</p>
                </div>
                <div className="adminOrderItemCol">
                    <p>Customer</p>
                    <p>{props.order.createdBy}</p>
                </div>

                <div className="adminOrderItemCol">
                    <p>Products</p>
                    {props.order.order_Details.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <p>
                                    Product Id: {item.productId} - Quantity: {item.quantity}
                                </p>
                                <p></p>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="adminOrderItemCol"></div>
            </div>
            <div className="adminOrderItemBtns">
                <p>Total Price:</p>
                <p>{props.order.totalPrice}:-</p>
            </div>
        </div>
    );
}
