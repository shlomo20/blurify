import React from "react";
import './popup.css'
import App from "../components/app";
import TabHandler from "../components/tabHandler";

const Popup = () => {
    return (
        <App>
            <div data-theme="mytheme" className=" p-3"> 
                <h1 className="text-4xl text-green-500 pb-2">Blurify</h1>
                <TabHandler/>
            </div>
        </App>
    )
};

export default Popup;