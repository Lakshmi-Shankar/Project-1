import React from 'react';

const Home = () => {
    const name = localStorage.getItem("Username")
    return (
        <>
            <div className='profile'>
                <div className='fis'>Dashboard</div>
                <div className='sec'>Project-1</div>
                <div className='las'>{name}</div>
            </div>
        </>
    );
}

export default Home;
