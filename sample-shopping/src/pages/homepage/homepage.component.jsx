import React from 'react';

import './homepage.style.scss';

import MenuItem from '../../components/menu-item/menu-item.component'

const HomePage = () =>
(
    <div className='homepage'>
        <div className='directory-menu'>
            <MenuItem></MenuItem>
            
        </div>
    </div>
);

export default HomePage;