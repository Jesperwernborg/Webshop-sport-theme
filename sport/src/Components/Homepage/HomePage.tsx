import React from "react";
import "./HomePage.scss";

export default function Navbar() {
    return (
        <React.Fragment>
            <div className="homePage">
                <div className="homePageCenterContent">
                    <h1 className="homePageTitle t-shadow">THE BEST SPORT SITE</h1>
                    <div className="homePageCenterButtonContainer ">
                        <a href="/products"><button className="bg-orange standardButton">PRODUCTS</button></a>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}