import React from "react";
import { ICartItem } from "../CartItem/ICartItem";

import "./Navbar.scss";

interface INavBarData {
    cartItems: ICartItem[];
}
  

class NavBar extends React.Component<INavBarData, {}> {

calculateNumItems(): number {
    let numItems: number = 0;
    this.props.cartItems.forEach((item)=>{
      numItems += item.quantity;
    });
    return numItems;
}

render() {
    return(
        <React.Fragment>
            <nav id="navbar">
                <div className="navContent" >
                    <div className="logo t-shadow"><a href="/" className="LogoLink">LOGO</a></div>
                    <div className="navLinks">
                        <div className="navLink"><form className="searchBtnContainer navItem bg-orange"><input placeholder="Search" className="buttonPress"/><button className="bg-orange standardButton"><i className="fas fa-search"></i></button></form></div>
                        <div className="navLink"><a href="/products" ><button className="navLinkProducts bg-orange navItem standardButton">Products</button></a></div>
                        <div className="navLink"><a href="/cart" ><button className="shoppingCartLink bg-orange navItem standardButton"><span className="cartAmountSign"><p>{this.calculateNumItems()}</p></span><i className="fas fa-shopping-cart"></i></button></a></div>  
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}
}
export default NavBar;