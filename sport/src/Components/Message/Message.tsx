import React from "react";
import './Message.scss';


interface IMessageProps {
    children: React.ReactNode;
} 


export default function Message(props: IMessageProps) {

    return(
        <div className="message">
            <div>{props.children}</div>
        </div>
    )
}