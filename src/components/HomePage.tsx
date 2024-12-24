import React from "react";
import Navbar from "./Main/Navigation/Navbar";
import Main from "./Main/Main";
import Footer from "./Main/Footer/Footer";

const HomePage = () => {

    return (
        <div className='w-[100vw] px-2 mx-auto'>
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}

export default HomePage

