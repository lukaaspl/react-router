import React from 'react';
import { Route } from 'react-router-dom';

import homeImage from '../images/home-img.jpg';
import aboutImage from '../images/about-img.jpg';
import pricingImage from '../images/pricing-img.jpg';

const displayTopbar = (imgPath, imgAlt = '') => {
    const imageToRender = <img src={imgPath} alt={imgAlt} />;

    return (
        <section className="topbar-image">
            {imageToRender}
        </section>
    );
}

const TopbarImage = () => {
    return (
        <React.Fragment>
            <Route
                path='/'
                exact
                component={displayTopbar.bind(this, homeImage)}
            />

            <Route
                path='/about'
                render={displayTopbar.bind(this, aboutImage)}
            />

            <Route
                path='/pricing'
                exact
                render={displayTopbar.bind(this, pricingImage)}
            />
        </React.Fragment>
    );
}

export default TopbarImage;