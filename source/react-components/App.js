import React, {useState} from 'react';
import { render } from 'react-dom';
import cs from 'classnames';

import pngPath from '../images/bg2.jpeg';
import svgPath from '../images/iconPro.svg';
import s from './style.css';

const App = ({name}) => {
    const [counter, setCount] = useState(0);

    const handleClick = () => {
        setCount(counter + 1);
    };

    return (
        <div className={s.app} style={{'--app-color': '#f8d303'}}>
            <h3 className={s.title}>This is React</h3>
            <p>My name id {name}</p>
            <p>Counter: {counter}</p>
            <button className={cs(s.btn, s.test)} onClick={handleClick}>Increaze</button>
            <p><img src={pngPath} /></p>
            <p><img src={svgPath} /></p>
            <span className={s.svgIcon} />
            <div className={s.jpegIcon} />
        </div>
    )
}

console.log('add tag', document.getElementById('app'));

render(
    <App name="Giovanni" />,
    document.getElementById('app')
  );