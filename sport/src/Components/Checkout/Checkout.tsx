import React from 'react';
import './Checkout.scss';


import { Link } from 'react-router-dom';
import { ICartItem } from '../CartItem/ICartItem';
import { INewOrder } from './INewOrder';
import { OrderService } from '../../services/OrderService';
import Message from '../Message/Message';
import { INewOrder_Detail } from './INewOrder_Detail';




interface ICheckoutProps {
    cartItems: ICartItem[];
    onClearCart(): void;
}

interface ICheckoutState {
    order: INewOrder;
    isSuccessful: boolean;
    hasError: boolean;
    errorMessage: string;
}



class Checkout extends React.Component<ICheckoutProps, ICheckoutState> {
    constructor(props: ICheckoutProps) {
        super(props);
        this.state = {
            order: {
                companyId: 0,
                created: '',
                createdBy: '',
                paymentMethod: '',
                totalPrice: 0,
                status: 0,
                order_Details: []
            },
            isSuccessful: false,
            hasError: false,
            errorMessage: ''
        }
    }
    private orderService = new OrderService();

    calculateTotal(): number {
        let total: number = 0;
        this.props.cartItems.forEach((item) => {
            total += (item.product.price * item.quantity);
        });
        return total;
    }

    createOrder_Details(): INewOrder_Detail[] {
        const order_Details: INewOrder_Detail[] = this.props.cartItems.map((item) => {
            return { ProductId: item.product.id, Quantity: item.quantity };
        });
        return order_Details;
    }


    async postNewOrder(data: INewOrder) {
        let message = await this.orderService.postOrder('https://localhost:5001/orders', data);
        if (message) {

            this.setState({
                order: {
                    companyId: 0,
                    created: '',
                    createdBy: '',
                    paymentMethod: '',
                    totalPrice: 0,
                    status: 0,
                    order_Details: []
                },
                hasError: true,
                errorMessage: message
            });
        }
        else {
            this.props.onClearCart();
            this.setState({
                order: {
                    companyId: 0,
                    created: '',
                    createdBy: '',
                    paymentMethod: '',
                    totalPrice: 0,
                    status: 0,
                    order_Details: []
                },
                isSuccessful: true
            });
        }
    }



    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let updatedOrder = { ...this.state.order };
        if (e.target.type === 'radio') {
            updatedOrder.paymentMethod = e.target.value;
        }
        else {
            updatedOrder.createdBy = e.target.value;
        }
        this.setState({
            order: updatedOrder
        });
    }


    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.state.order.createdBy && this.state.order.paymentMethod && this.props.cartItems.length) {
            let updatedOrder = { ...this.state.order };
            updatedOrder.companyId = 707;
            updatedOrder.created = new Date().toISOString();
            updatedOrder.totalPrice = this.calculateTotal();
            updatedOrder.status = 2;
            updatedOrder.order_Details = this.createOrder_Details();

            this.postNewOrder(updatedOrder);

        }
    }




    render() {

        if (this.state.hasError) {
            return (
                <React.Fragment>
                    <div className="navBlocker"></div>
                    <div className="checkout">
                        <Message>{this.state.errorMessage}</Message>
                        <Link to="/products" className="link backBtnCheckout"><span>Back to Products</span></Link>
                    </div>
                </React.Fragment>
            )
        }

        if (!this.props.cartItems.length) {
            return (
                <React.Fragment>
                    <div className="navBlocker"></div>
                    <div className="checkout">
                        <h2>Checkout</h2>

                        {(this.state.isSuccessful) ? <Message>Thank You!</Message> :
                            <Message>There are no products in the cart!</Message>}

                        <Link to="/products" className="link backBtnCheckout"><span>Back to Products</span></Link>

                    </div>
                </React.Fragment>
            );
        }


        return (
            <React.Fragment>
                <div className="navBlocker"></div>
                <div className="checkout">
                    <h2>Checkout</h2>

                    <div className="checkout-wrapper">
                        <div className="order-summary">
                            <h5>Order summary</h5>
                            {this.props.cartItems.map((item) => {
                                return (<div key={item.product.id} className="product"><span><b>{item.quantity}</b> {(item.quantity > 1) ? `items` : `${item.product.name}`}</span></div>)
                            })}

                            <p className="total"><b>Total price: {this.calculateTotal()} SEK</b></p>
                        </div>
                        <div>
                            <div className="order-form">
                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                    <label>E-mail: <input type="email" name="createdBy" value={this.state.order.createdBy} onChange={(e) => this.handleChange(e)}></input></label>

                                    <div className="radio">
                                        <label><input type="radio" checked={this.state.order.paymentMethod === 'MasterCard'} onChange={(e) => this.handleChange(e)} value="MasterCard" /><span>MasterCard</span></label>
                                        <label><input type="radio" checked={this.state.order.paymentMethod === 'Visa'} onChange={(e) => this.handleChange(e)} value="Visa" /><span>Visa</span></label>
                                        <label><input type="radio" checked={this.state.order.paymentMethod === 'PayPal'} onChange={(e) => this.handleChange(e)} value="PayPal" /><span>PayPal</span></label>
                                    </div>

                                    <button type="submit" className="standarsButton bg-orange checkoutBtn">Buy</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default Checkout;



