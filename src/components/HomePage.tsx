import React from "react";
import Navbar from "./Navbar";
import Main from "./Main/Main";
import Footer from "./Footer";

const HomePage = () => {

    return (
        <div className='w-[100vw] py-3 px-5 mx-auto'>
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}

export default HomePage

