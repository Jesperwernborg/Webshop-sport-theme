import React from 'react';
import { IOrderService, OrderService } from '../../services/OrderService';
import AdminOrder from '../AdminOrder/AdminOrder';
import { IOrder } from '../Checkout/IOrder';
import './Admin.scss'



interface IAdminProps {
    toggledReload: boolean;
    onReload(): void;
}

interface IAdminState {
    orders: IOrder[];
    loading: boolean;
    hasError: boolean;
    errorText: string;
    notFound: boolean;
}

class Admin extends React.Component<IAdminProps, IAdminState> {
    constructor(props: IAdminProps) {
        super(props);
        this.state = {
            orders: [],
            loading: false,
            hasError: false,
            errorText: '',
            notFound: false,
        }

    }

    private orderService: IOrderService = new OrderService();

    componentDidMount() {

        this.fetchOrders('https://localhost:5001/orders?companyId=707');

    }


    async fetchOrders(url: string) {
        const resultTuple = await this.orderService.getOrders(url);
        const fetchedOrders: IOrder[] = resultTuple[0];
        if (fetchedOrders.length) {
            this.setState({
                orders: fetchedOrders
            });
        }

    }
    render() {
        return (
            <React.Fragment>
                <div className="navBlocker"></div>
                <div className="adminPage">
                    <h3>ORDERS</h3>
                    <div className="adminOrdersContainer">
                        {this.state.orders.map((item) => {
                            return (
                                <AdminOrder key={item.id} order={item} />
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Admin;