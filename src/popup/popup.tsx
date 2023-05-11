import React from "react";
import './popup.css'
import App from "../components/app";
import TabHandler from "../components/tabHandler";

const Popup = () => {
    return (
        <App>
            <h1 className="text-4xl text-green-500">Blurify</h1>
            <TabHandler/>
        </App>
    )
};

export default Popup;