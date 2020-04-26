import React from 'react';

import './homepage.style.scss';

import Directory from '../../components/directory/directory.component';

const HomePage = () =>
(
    <div className='homepage'>
        <div className='directory-menu'>         
            <Directory></Directory>
        </div>
    </div>
);

export default HomePage;