import React from "react";
import "./ShoppingCartPage.scss";
import { ICartItem } from '../CartItem/ICartItem';
import CartItem from "../CartItem/CartItem";
import Message from "../Message/Message";
import { Link } from "react-router-dom";

export interface ICartProps {
  cartItems: ICartItem[];
  onRemove(cartItem: ICartItem): void;
  onUpdateQuantity(cartItem: ICartItem): void;
}

class Cart extends React.Component<ICartProps, {}> {


  calculateTotal(): number {
    let total: number = 0;
    this.props.cartItems.forEach((item) => {
      total += (item.product.price * item.quantity);
    });
    return total;
  }

  render() {

    if (!this.props.cartItems) {
      return (
        <div className="cart">
          <h2>Cart</h2>
          <Message>Your cart is empty</Message>
        </div>
      );
    }


    return (
      <React.Fragment>
        <div className="navBlocker"></div>
        <div className="shoppingCartPage">
          <div className="cartTitleContainer"><h2>CART</h2></div>
          <div className="cartContainer">
            <div className="cartItemContainer">
              <ul className="cartItemUl">
                {this.props.cartItems.map((item) => {
                  return (
                    <CartItem key={item.product.id} cartItem={item} onRemove={this.props.onRemove} onUpdateQuantity={this.props.onUpdateQuantity} />
                  );
                })}
              </ul>
            </div>
            <div className="cartInfoContainer">
              <p>{this.calculateTotal()} kr</p>
            </div>
            <Link to="/checkout" className="shoppingCheckoutBtn bg-orange standardButton"><p>PROCEED TO CHECKOUT</p></Link>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Cart;

