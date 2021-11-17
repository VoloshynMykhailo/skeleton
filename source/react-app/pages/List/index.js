import React, {memo} from 'react';

const data = [1,2,3,4,5,6,7,8,9];

const ListComponent = () => {
    console.log('list');
    return (
        <ul>
            {data.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
};

export const List = memo(ListComponent);