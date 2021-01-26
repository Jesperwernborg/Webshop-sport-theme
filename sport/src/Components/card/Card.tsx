import React from "react";
import './Card.scss';

interface ICardProps {
    image: string;
    name: string;
    price: number;
    description: string;
}

export default function Card(props: ICardProps){
    return(
    <div className="productsButton" >
        <div className="productCartLayout" >
            <img src={props.image} alt=""/>
            <div className="productCartheader bg-orange">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
                <p>{props.price}:-</p>
            </div>
        </div>
    </div>
    );
}