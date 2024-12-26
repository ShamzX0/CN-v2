import React from "react";
import Navbar from "./Main/Navigation/Navbar";
import Main from "./Main/Main";
import Footer from "./Main/Footer/Footer";

const HomePage = () => {

    return (
        <div className='max-w-[1390px] mx-auto'>
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}

export default HomePage

