import React from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Overallstats from "./Overallstats";
import Footer from "./Footer";

const HomePage = () => {

    return (
        <div className='w-[99vw] py-3 px-5 mx-auto'>
            <Navbar />
            <Dashboard />
            <Footer />
        </div>
    )
}

export default HomePage


























// import React from 'react'
// import Trending from './Trending';
// import CryptoTable from './CryptoTable';

// const HomePage = () => {

//     return (
//         <>
//             <main className='p-6 bg-indigo-400'>
//                 <div className='flex justify-center'>
//                     <Trending />
//                 </div>
//                 <div className='flex h-screen'>
//                     <div className='w-full h-full p-11'>
//                         <CryptoTable />
//                     </div>
//                 </div>
//             </main>
//         </>
//     );
// };

// export default HomePage;
