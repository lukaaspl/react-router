import React from 'react';

const BundleLayer = props => {
    if (props.active)
        props.redirect();
    return (
        <div className={props.active ? 'bundle-layer shown' : 'bundle-layer'}>
            <div className="bundlelayer-container">
                <div className="bundlelayer-icon">
                    <img src={props.icon} alt="" />
                </div>

                <h2>Thanks for shopping!</h2>
                <p>Now i will redirect You to the bank's website to make a payment...</p>
            </div>
        </div>
    );
}

export default BundleLayer;