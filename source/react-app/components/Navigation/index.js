import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {pagesList} from "../../data";

const NavigationComponent = () => {
    console.log('navigation');
    return (
        <nav>
            <ul>
                {pagesList.map(({url}) => (
                    <li key={url}>
                        <Link to={url}>{url.toUpperCase()}</Link>
                    </li>
                ))}

            </ul>
            Navigation
        </nav>
    )
};

export const Navigation = memo(NavigationComponent);