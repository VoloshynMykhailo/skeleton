import React, {memo} from 'react';

const MainComponent = () => {
    console.log('main');
    return (
        <h2>
            Main
        </h2>
    )
};

export const Main = memo(MainComponent);