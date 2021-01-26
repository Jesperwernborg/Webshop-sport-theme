import React from "react";
import { ICartItem } from "./ICartItem";
import './CartItem.scss'

export interface CartItemProps {
    cartItem: ICartItem;
    onRemove(cartItem: ICartItem): void;
    onUpdateQuantity(cartItem: ICartItem): void;   
}


class CartItem extends React.Component<CartItemProps, {}> {

    handleRemove(e: React.MouseEvent<HTMLElement>){
        this.props.onRemove(this.props.cartItem);
    }

    handleUpdateQuantity(e: React.MouseEvent<HTMLElement>, num: number){
        let newQuantity: number = this.props.cartItem.quantity + num;
        if(newQuantity <= 0){
            newQuantity = 1;   
        }
        const newTotal: number = this.props.cartItem.product.price * newQuantity;
        const updatedCartItem: ICartItem = {
            product: this.props.cartItem.product,
            quantity: newQuantity,
            totalPrice: newTotal
        }
        this.props.onUpdateQuantity(updatedCartItem);
    }
    


    render() { 
        return(
            <li className="cartItemProduct">
                <p className="cartItemName">{this.props.cartItem.product.name}</p>
                <div className="quantityCartCointainer">
                    <button className="quantityCartBtn decreaseBtn"><span onClick={(e) => this.handleUpdateQuantity(e, -1)}>-</span></button>
                    <span className="quantityCartAmount">{this.props.cartItem.quantity}</span>
                    <button className="quantityCartBtn increaseBtn"><span onClick={(e) => this.handleUpdateQuantity(e, 1)}>+</span></button>
                    <div className="cart-remove">
                        <button onClick={this.handleRemove.bind(this)} className="shop-btn movie-shop-button">Remove</button>
                    </div>
                </div>
                <p className="cartItemPrice ">{this.props.cartItem.product.price}</p>
            </li>
        )
    }
 }

 export default CartItem;