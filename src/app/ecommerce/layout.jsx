import React from 'react';
import Header4 from '../Components/Header/HeaderStyle4';
import Footer4 from '../Components/Footer/Footer4';

const layout = ({ children }) => {
    return (
        <div className='main-page-area3'>
            <Header4></Header4>
            {children}
            <Footer4></Footer4>
        </div>
    );
};

export default layout;