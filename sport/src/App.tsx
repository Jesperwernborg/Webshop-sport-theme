import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';

import Nav from "./Components/Navbar/Navbar";
import HomePage from "./Components/Homepage/HomePage";
import ProductPage from "./Components/ProductsPage/ProductsPage";
import ShoppingCartPage from './Components/ShoppingCartPage/ShoppingCartPage';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import  IProduct  from './Components/ProductsPage/IProduct';
import { ICartItem } from './Components/CartItem/ICartItem';
import { ProductService } from './services/ProductServices';
import Checkout from './Components/Checkout/Checkout';


interface IAppState {
  cartItems: ICartItem[];
  toggledReload: boolean;
  isLoggedIn: boolean;
}


class App extends React.Component<{}, IAppState> {



constructor(props: any){
  super(props);

  this.state = {
    cartItems: this.retrieveList('cartItems'),
    toggledReload: false,
    isLoggedIn: false
  }

  this.handleAddToCart = this.handleAddToCart.bind(this);
  this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
  this.handleClearCart = this.handleClearCart.bind(this);
  this.handleReload = this.handleReload.bind(this);
  this.setLoggedIn = this.setLoggedIn.bind(this);
}
private productService = new ProductService();


//Methods to handle cart

handleAddToCart(addedProduct: IProduct) {
  console.log(addedProduct);
  let isInCart: boolean = false;
  this.state.cartItems.forEach((item)=>{
    if(item.product.id === addedProduct.id){
      isInCart = true;
    }
  });
  if(!isInCart){
    const cartItem = {product: addedProduct, quantity: 1, totalPrice: addedProduct.price}; 
    const updatedCartItems = [...this.state.cartItems, cartItem];
    this.storeList(updatedCartItems, 'cartItems');
    this.setState({
      cartItems: updatedCartItems
    });
  }
}





handleRemoveFromCart(removedCartItem: ICartItem) {
  const updatedCartItems = this.state.cartItems.filter(item => {
    return (item.product.id !== removedCartItem.product.id);
  });
  this.storeList(updatedCartItems, 'cartItems');
  this.setState({cartItems: updatedCartItems});
}


handleUpdateQuantity(updatedCartItem: ICartItem) {
  const updatedCartItems = [...this.state.cartItems];
  //find item and replace with the updated version
  updatedCartItems.forEach((item, idx)=>{
    if(item.product.id === updatedCartItem.product.id){
      updatedCartItems.splice(idx, 1, updatedCartItem);
    }
  });
  this.storeList(updatedCartItems, 'cartItems');
  this.setState({cartItems: updatedCartItems});
}


handleClearCart() {
  const clearedCart: ICartItem[] = [];
  this.storeList(clearedCart, 'cartItems');
  this.setState({cartItems: clearedCart});
}



 //Session storage
 storeList(arr: ICartItem[], storageName: string): void{
  //browser has webStorage
  if(typeof(Storage) !== "undefined"){           
      sessionStorage.setItem(storageName, JSON.stringify(arr));           
  }
}


retrieveList(storageName: string): ICartItem[]{
  const arr: ICartItem[] = [];
  //browser has webStorage
  if(typeof(Storage) !== "undefined"){

    //defined in sessionStorage
    if(sessionStorage.getItem(storageName)){
      let tempList: any[];
      let temp: string | null = sessionStorage.getItem(storageName); 
      tempList = (temp)? JSON.parse(temp) : [];
      
      if(tempList.length > 0){
          arr.length = 0;
          tempList.forEach((item: any) => {
              arr.push(item);
          });
      }
    }    
  }
  return arr;    
}




//changes state to refetch products/ orders on current page 
//when clicking link to current page e.g. in navbar
handleReload() {
  let newStatus = (this.state.toggledReload)? false : true;
  this.setState({toggledReload: newStatus}); 
}


setLoggedIn(){
  let newLoggedStatus = (this.state.isLoggedIn)? false : true;
  this.setState({
    isLoggedIn: newLoggedStatus
  });
}





render() {

  return (
  <Router>  
    <div className="App">
    
      <Nav cartItems={this.state.cartItems}/>
      <Switch>
       <Route path="/products/:id" ><ProductDetails onAddToCart={this.handleAddToCart}/></Route>
        <Route path="/products" ><ProductPage service={this.productService}/></Route>
        <Route exact path="/checkout"><Checkout cartItems={this.state.cartItems} onClearCart={this.handleClearCart}/></Route>
        <Route path="/cart" ><ShoppingCartPage cartItems={this.state.cartItems} onRemove={this.handleRemoveFromCart} onUpdateQuantity={this.handleUpdateQuantity}/></Route>
        <Route exact path="/"><HomePage/></Route>
        <Route path="/" ><NotFoundPage></NotFoundPage></Route>
      </Switch>
    </div>   
  </Router>
       
  );
}
}

export default App;
