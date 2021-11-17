import React, {memo} from 'react';

const HomeComponent = () => {
    console.log('home');
    return (
        <h3>
            Home
        </h3>
    )
};

export default memo(HomeComponent)